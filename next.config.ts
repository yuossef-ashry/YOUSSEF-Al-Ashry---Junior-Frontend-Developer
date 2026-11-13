import type { NextConfig } from "next";
import { imageWidths } from "./lib/static-image-config.mjs";

const nextConfig: NextConfig = process.env.DEPLOY_TARGET === "cloudflare-pages"
  ? {
      output: "export",
      images: {
        loader: "custom",
        loaderFile: "./lib/static-image-loader.ts",
        deviceSizes: imageWidths,
        imageSizes: [],
      },
    }
  : {};

export default nextConfig;
