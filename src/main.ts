import { Game } from './game';
import { BoardScene } from './scenes/boardScene';
import { MenuScene } from './scenes/menuScene';
import { ScoreScene } from './scenes/scoreScene';
import './style.css';

window.addEventListener('load', () => {
  const config: Phaser.Types.Core.GameConfig = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#000000',
    scene: [MenuScene, BoardScene, ScoreScene],
  };

  new Game(config);
});

