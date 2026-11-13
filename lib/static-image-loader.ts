"use client";

import type { ImageLoaderProps } from "next/image";
import { staticImagePath } from "./static-image-config.mjs";

export default function staticImageLoader({ src, width }: ImageLoaderProps) {
  if (!src.startsWith("/images/")) throw new Error(`Unsupported static image: ${src}`);
  if (src.endsWith(".svg")) return src;
  return staticImagePath(src, width, process.env.NEXT_PUBLIC_STATIC_IMAGE_VERSION);
}
