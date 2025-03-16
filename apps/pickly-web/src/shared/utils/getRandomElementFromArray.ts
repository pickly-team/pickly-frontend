function getRandomElementFromArray(array: any[]) {
  const length = array.length;
  const randomIndex = Math.floor(Math.random() * length);
  return array[randomIndex];
}

export default getRandomElementFromArray;
