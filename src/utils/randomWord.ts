import { listOfWords } from '../listOfWords';

export const getRandomWord = (forbiddenLetters: string[]): string | null => {
  const clone = [...listOfWords];

  while (clone.length > 1) {
    const index = Math.floor(Math.random() * clone.length);
    const word = clone[index];
    clone.splice(index, 1);
    if (!word) {
      continue;
    }

    if (forbiddenLetters.some(letter => word.toString().startsWith(letter))) {
      continue;
    }

    return word as string;
  }

  return null;
}

export const getRandomLetter = (forbiddenLetters: string[]): string => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const availableLetters = letters.split('').filter(letter => !forbiddenLetters.includes(letter));
  return availableLetters[Math.floor(Math.random() * availableLetters.length)];
}