import { Game } from './game';
import { Board } from './scenes/board';
import { Menu } from './scenes/menu';
import './style.css';

window.addEventListener('load', () => {
  const config: Phaser.Types.Core.GameConfig = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#000000',
    scene: [Menu, Board],

  };

  new Game(config);
});

