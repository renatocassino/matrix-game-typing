import { Board } from './board';
import { Game } from './game';
import './style.css';

window.addEventListener('load', () => {
  const config: Phaser.Types.Core.GameConfig = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#000000',
    scene: [Board]
  };

  new Game(config);
});

