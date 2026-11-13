import { createHash } from "node:crypto";
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { imageWidths, imageQuality, staticImagePath } from "../lib/static-image-config.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "out");
const deployment = JSON.parse(await readFile(new URL("../cloudflare-pages.json", import.meta.url), "utf8"));
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || deployment.siteUrl;

if (!siteUrl || new URL(siteUrl).protocol !== "https:") {
  throw new Error("Set NEXT_PUBLIC_SITE_URL to your final HTTPS portfolio URL before building Pages.");
}

async function collectImages(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectImages(absolutePath));
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) files.push(absolutePath);
  }
  return files.sort();
}

const sources = await collectImages(path.join(root, "public", "images"));
const digest = createHash("sha256").update(JSON.stringify({ imageWidths, imageQuality }));
for (const source of sources) {
  digest.update(path.relative(root, source)).update(await readFile(source));
}
const version = digest.digest("hex").slice(0, 16);
const require = createRequire(import.meta.url);

await new Promise((resolve, reject) => {
  const child = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "build"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, NEXT_PUBLIC_SITE_URL: siteUrl, DEPLOY_TARGET: "cloudflare-pages", NEXT_PUBLIC_STATIC_IMAGE_VERSION: version },
  });
  child.on("error", reject);
  child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`Next.js build failed (${code}).`)));
});

let imageBytes = 0;
for (const source of sources) {
  const src = `/${path.relative(path.join(root, "public"), source).split(path.sep).join("/")}`;
  for (const width of imageWidths) {
    const destination = path.join(output, staticImagePath(src, width, version));
    await mkdir(path.dirname(destination), { recursive: true });
    const result = await sharp(source).rotate().resize({ width, withoutEnlargement: true })
      .webp({ quality: imageQuality, alphaQuality: 100 }).toFile(destination);
    imageBytes += result.size;
  }
}

// Static route handlers are extensionless files; Pages needs an explicit JSON content type.
await writeFile(path.join(output, "_headers"), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/api/*
  Content-Type: application/json; charset=utf-8
  Cache-Control: public, max-age=0, must-revalidate
  X-Robots-Tag: noindex

/_next/static/*
  Cache-Control: public, max-age=31536000, immutable

/_images/*
  Cache-Control: public, max-age=31536000, immutable
`);

console.log(`Pages export ready: ${sources.length * imageWidths.length} responsive images (${(imageBytes / 1048576).toFixed(2)} MiB).`);
console.log(`Canonical URL: ${new URL(siteUrl).origin}`);
