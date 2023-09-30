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
  Letters,
  TypeLesson,
}

export enum WordMode {
  Duration,
  Waves,
}

export enum GameLevel {
  Easy,
  Medium,
  Hard,
}

export type WaveConfig = {
  duration: number;
  words: string[];
  waveNumber: number;
  wordDropInterval: number;
}

export type RoundConfig = {
  gameMode: GameMode;
  wordMode: WordMode;
  timeLimit: number;
  level: GameLevel;
  wordDropInterval: number;
  maxFailures?: number;
  waves?: WaveConfig[];
  lettersToTypeLesson?: string[];
}
