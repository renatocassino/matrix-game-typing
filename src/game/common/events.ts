import type { CustomWindow } from './types/commonTypes';

const gtag = typeof window !== 'undefined' ? (window as CustomWindow).gtag ?? (() => {}) : () => {};

export const gaEvents = {
  play() {
    gtag('event', 'game_play');
  },
  goToTraining() {
    gtag('event', 'game_training_menu');
  },
  restart() {
    gtag('event', 'game_restart');
  },
  backToMainMenu() {
    gtag('event', 'game_back_to_main_menu');
  },
  openMenu() {
    gtag('event', 'game_open_menu');
  },
  openScoreModal() {
    gtag('event', 'game_open_score_modal');
  },
  nextWave(waveNumber: number) {
    gtag('event', 'game_next_wave', {
      event_category: 'game',
      event_label: 'next_wave',
      value: waveNumber
    });
  }
};
