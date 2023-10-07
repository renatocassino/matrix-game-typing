import { CustomWindow } from './types/commonTypes';

const gtag = (window as CustomWindow).gtag ?? (() => { });

export const gameEvents = {
  play: () => {
    gtag('event', 'game_play', {
      event_category: 'game',
      event_label: 'play',
    });
  },
};
