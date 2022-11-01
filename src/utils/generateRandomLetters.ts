const generateRandomLetters = (length: number) => {
  const values = [];

  const chars = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

  while (values.length < length) {
    const letter = chars.charAt(Math.floor(Math.random() * chars.length));
    if (values.indexOf(letter) === -1) {
      values.push(letter);
    }
  }

  return values;
};

export default generateRandomLetters;
