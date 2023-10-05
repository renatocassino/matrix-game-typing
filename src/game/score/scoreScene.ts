import { CustomWindow } from '../../commonTypes';
import { assets } from '../constants/assets';
import { MenuScene } from '../menu/menuScene';
import { ScoreStatus } from '../round/components/scoreComponent';

export class ScoreScene extends Phaser.Scene {
  static key = 'ScoreScene';

  scoreStatus?: ScoreStatus;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: ScoreScene.key, ...(config ?? {}) });
  }

  init(data: { score: ScoreStatus }) {
    this.scoreStatus = data.score;
    this.addScoreInLocalStorage();
  }

  addScoreInLocalStorage() {
    const scores = JSON.parse(localStorage.getItem('scores') ?? '[]');
    scores.push({ ...this.scoreStatus, date: new Date().toISOString() });
    localStorage.setItem('scores', JSON.stringify(scores));
  }

  create() {
    this.cameras.main.fadeIn(300);
    this.addBackground();
    this.addFadeAnimation();
    this.addScoreStatus();
  }

  addScoreStatus() {
    const self = this;
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    this.add.image(
      boardWidth / 2,
      boardHeight / 2,
      assets.ui.CARD,
    )
      .setScale(0.7)
      .setAlpha(0.6)
      .setRotation(Phaser.Math.DegToRad(90));
    const style = { color: '#FFF', font: '16px Orbitron' };
    const yText = 215;

    this.add.text(boardWidth / 2, boardHeight / 2 - 200, 'Score', { font: '32px Orbitron', color: '#fff' }).setOrigin(0.5, 0.5);

    const texts = [
      `Keys Pressed: ${this.scoreStatus?.keysPressed ?? 0}`,
      `Misses: ${this.scoreStatus?.misses ?? 0}`,
      `Longest Streak: ${this.scoreStatus?.longestStreak ?? 0}`,
      `Score: ${this.scoreStatus?.score ?? 0}`,
      `WPM: ${this.scoreStatus?.wpm.toFixed(2) ?? 0}`,
      `Words Typed: ${this.scoreStatus?.wordsTyped ?? 0}`,
      `Precision: ${this.scoreStatus?.precision ?? 0}`,
      `Lost words: ${this.scoreStatus?.lostWords ?? 0}`,
    ];

    texts.forEach((text, index) => {
      this.add.text(boardWidth / 2, yText + (index * 25), text, style).setOrigin(0.5, 0);
    });

    const backToMenuText = this
      .add
      .text(this.cameras.main.width / 2, 500, 'Back to menu', { color: '#FFF', font: '20px Orbitron' })
      .setOrigin(0.5);

    const scoreGraph = this.add.text(this.cameras.main.width / 2, 440, 'See graph', { color: '#FFF', font: '20px Orbitron' }).setOrigin(0.5);
    scoreGraph.setInteractive();
    scoreGraph.on('pointerdown', () => {
      (window as CustomWindow).openScoreModal();

      setTimeout(() => {
        if (this.scoreStatus) {
          (window as CustomWindow).updateChart(this.scoreStatus.wpmHistory);
        }
      }, 500);
    }).on('pointerover', () => {
      backToMenuText.setAlpha(0.8);
      self.input.setDefaultCursor('pointer');
    }).on('pointerout', () => {
      backToMenuText.setAlpha(1);
      self.input.setDefaultCursor('default');
    });

    backToMenuText.setInteractive();
    backToMenuText.on('pointerdown', () => {
      this.scene.start(MenuScene.key);
    }).on('pointerover', () => {
      backToMenuText.setAlpha(0.8);
      self.input.setDefaultCursor('pointer');
    }).on('pointerout', () => {
      backToMenuText.setAlpha(1);
      self.input.setDefaultCursor('default');
    });
  }

  addBackground() {
    const bg = this.textures.get(assets.bg.SCORE).get(0);
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    const widthRatio = boardWidth / bg.width;
    const heightRatio = boardHeight / bg.height;

    const scaleFactor = Math.max(widthRatio, heightRatio);

    this
      .add
      .image(boardWidth / 2, boardHeight / 2, assets.bg.SCORE)
      .setOrigin(0.5, 0.5)
      .setScale(scaleFactor);
  }

  addFadeAnimation() {
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    const rectangle = this
      .add
      .rectangle(0, 0, boardWidth, boardHeight, 0x000000, 1)
      .setOrigin(0, 0)
      .setAlpha(0);

    this.tweens.add({
      targets: rectangle,
      alpha: 0.5,
      delay: 100,
      duration: 1000,
      ease: 'Linear',
      repeat: 0,
    });
  }
}
