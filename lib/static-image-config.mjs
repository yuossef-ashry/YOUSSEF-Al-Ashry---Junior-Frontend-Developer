export const imageWidths = [320, 480, 640, 750, 828, 1080, 1280, 1600, 1920];
export const imageQuality = 82;

export function staticImagePath(src, width, version) {
  return `/_images/${version}${src.replace(/\.[^.]+$/, "")}-${width}.webp`;
}
