import { listOfWords } from './listOfWords.ts';


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