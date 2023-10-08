export type Config = {
  letterSize: number;
}

export type WordStatus = 'active' | 'inactive' | 'completed';

export enum LetterStatus {
  Initial,
  Current,
  Typed,
}

export enum GameMode {
  Words,
  Letters, // UNDER CONSTRUCTION
  TypeLesson, // UNDER CONSTRUCTION
}

export enum WordMode {
  Duration,
  Waves,
}

export type WaveConfig = {
  words?: string[]; // Under construction
  waveNumber: number;
  wordDropInterval: {
    min: number;
    max: number;
  };
  velocity: {
    min: number;
    max: number;
  },
  wordConfig: {
    size: {
      min: number;
      max: number;
    },
  },
  wordsToType: number;
}

export type RoundConfig = {
  gameMode: GameMode;
  wordMode: WordMode;
  timeLimit: number;
  waves?: WaveConfig[];
  lettersToTypeLesson?: string[];
}
