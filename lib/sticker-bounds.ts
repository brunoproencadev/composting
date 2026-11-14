export function boundSticker(x: number, y: number, width: number, height: number, size: number) {
  const insetX = Math.min(50, size / Math.max(1, width) * 50);
  const insetY = Math.min(50, size / Math.max(1, height) * 50);
  return { x: Math.max(insetX, Math.min(100 - insetX, x)), y: Math.max(insetY, Math.min(100 - insetY, y)) };
}
