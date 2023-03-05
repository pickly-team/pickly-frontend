function getRem(pixels: number | number[]): string {
  if (typeof pixels === 'number') {
    return `${calculateRem(pixels)}rem`;
  } else {
    return pixels.map((pixel) => `${calculateRem(pixel)}rem`).join(' ');
  }
}

const calculateRem = (pixel: number) => {
  return 0.0625 * pixel;
};

export default getRem;
