function getRem(...pixels: number[]): string {
  return pixels.map((pixel) => `${calculateRem(pixel)}rem`).join(' ');
}

export const calculateRem = (pixel: number) => {
  return 0.0625 * pixel;
};

export default getRem;
