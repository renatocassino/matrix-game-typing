import type { RoundConfig } from '../../../types';

export function wordConfigMinSize(waveNumber: number): number {
  if (waveNumber < 3) return 2;
  if (waveNumber < 5) return 3;
  if (waveNumber < 10) return 4;
  return 5;
}

export function wordConfigMaxSize(waveNumber: number): number {
  if (waveNumber < 3) return 4;
  if (waveNumber < 6) return 5;
  if (waveNumber < 8) return 6;
  return 10;
}

export function velocityByWaveNumber(waveNumber: number): { min: number; max: number } {
  if (waveNumber <= 1) return { min: 0.5, max: 0.6 };
  if (waveNumber < 3) return { min: 0.6, max: 0.8 };
  if (waveNumber < 5) return { min: 0.7, max: 1 };
  return { min: 0.8, max: 1.5 };
}

export function wordDropIntervalByWaveNumber(waveNumber: number): { min: number; max: number } {
  if (waveNumber <= 1) return { min: 1000, max: 4000 };
  if (waveNumber < 3) return { min: 900, max: 1800 };
  if (waveNumber < 5) return { min: 800, max: 1600 };
  if (waveNumber < 7) return { min: 700, max: 1400 };
  if (waveNumber < 9) return { min: 600, max: 1200 };
  if (waveNumber < 11) return { min: 500, max: 1000 };
  return { min: 400, max: 1000 };
}

export function wordsToTypeByWaveNumber(waveNumber: number): number {
  if (waveNumber <= 1) return 8;
  if (waveNumber < 3) return 12;
  if (waveNumber < 5) return 15;
  if (waveNumber < 6) return 20;
  if (waveNumber < 7) return 30;
  return 35;
}

export function generateWaves(numWaves: number): RoundConfig['waves'] {
  const waves = [];

  for (let i = 1; i <= numWaves; i += 1) {
    waves.push({
      velocity: velocityByWaveNumber(i),
      waveNumber: i,
      wordDropInterval: wordDropIntervalByWaveNumber(i),
      wordsToType: wordsToTypeByWaveNumber(i),
      wordConfig: {
        size: {
          min: wordConfigMinSize(i),
          max: wordConfigMaxSize(i)
        }
      }
    });
  }

  return waves;
}
