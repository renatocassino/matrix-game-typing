import { CustomWindow } from './types/commonTypes';

const gtag = (window as CustomWindow).gtag ?? (() => { });

export const gaEvents = {
  play() {
    gtag('event', 'game_play');
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
};
