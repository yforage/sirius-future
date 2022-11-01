export const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const generateRandomNumbers = (length: number, min: number, max: number) => {
  const values = [];
  while (values.length < length) {
    const number = getRandomNumber(min, max);
    if (values.indexOf(number) === -1) {
      values.push(number);
    }
  }

  return values;
};
