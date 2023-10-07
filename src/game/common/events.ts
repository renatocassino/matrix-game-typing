import { CustomWindow } from './types/commonTypes';

const gtag = (window as CustomWindow).gtag ?? (() => { });

export const gameEvents = {
  play: () => {
    gtag('event', 'button_click', {
      event_category: 'game',
      event_label: 'play',
    });
  },
};
