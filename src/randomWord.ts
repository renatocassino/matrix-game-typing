import { listOfWords } from './listOfWords.ts';


export const getRandomWord = (forbiddenLetters: string[]) => {
  const clone = [...listOfWords];

  while (clone.length > 0) {
    const index = Math.floor(Math.random() * clone.length);
    const word = clone[index];
    clone.splice(index, 1);

    if (forbiddenLetters.some(letter => word.startsWith(letter))) {
      continue;
    }

    return word;
  }

  return null;
}