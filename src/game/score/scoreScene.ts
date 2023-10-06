import { BackgroundImage } from '../common/components/ui/backgroundImage';
import { Overlay } from '../common/components/ui/overlay';
import { TextButton } from '../common/components/ui/textButton';
import { assets } from '../common/constants/assets';
import { CustomWindow } from '../common/types/commonTypes';
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
    localStorage.setItem('scores', JSON.stringify(scores.slice(-10)));
  }

  create() {
    this.cameras.main.fadeIn(300);
    const overlay = new Overlay(this);
    this.tweens.add({
      targets: overlay,
      alpha: 0.5,
      delay: 100,
      duration: 1000,
      ease: 'Linear',
      repeat: 0,
    });
    new BackgroundImage(this, assets.bg.SCORE);
    this.addScoreStatus();
  }

  addScoreStatus() {
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    this.add.image(
      boardWidth / 2,
      boardHeight / 2,
      assets.ui.CARD,
    )
      .setScale(0.7)
      .setAlpha(0.6);
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

    const backToMenuText = new TextButton(this, boardWidth / 2, 500, 'Back to menu');
    const scoreGraph = new TextButton(this, boardWidth / 2, 550, 'Score Graph');

    scoreGraph.on('pointerdown', () => {
      (window as CustomWindow).openScoreModal();

      setTimeout(() => {
        if (this.scoreStatus) {
          (window as CustomWindow).updateChart(this.scoreStatus.wpmHistory);
        }
      }, 500);
    });

    backToMenuText.on('pointerdown', () => {
      this.scene.start(MenuScene.key);
    });
  }
}
