export type Config = {
  letterSize: number;
}

export type WordStatus = 'active' | 'inactive' | 'completed';

export enum LetterStatus {
  Initial,
  Current,
  Typed,
}