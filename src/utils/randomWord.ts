import { listOfWords } from '../listOfWords';

export const getRandomWord = (
  forbiddenLetters: string[],
  minSize: number,
  maxSize: number,
): string | null => {
  const letterUsed = new Set(forbiddenLetters);
  const clone = [...listOfWords].filter((word) => letterUsed.has(word[0]) === false);

  while (clone.length > 1) {
    const index = Math.floor(Math.random() * clone.length);
    const word = clone[index];
    clone.splice(index, 1);
    if (!word) {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (word.length < minSize || word.length > maxSize) {
      // eslint-disable-next-line no-continue
      continue;
    }

    return word;
  }

  return null;
};

export const getRandomLetter = (forbiddenLetters: string[]): string => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const availableLetters = letters.split('').filter((letter) => !forbiddenLetters.includes(letter));
  return availableLetters[Math.floor(Math.random() * availableLetters.length)];
};
