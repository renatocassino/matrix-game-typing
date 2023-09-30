import { CustomWindow } from "../../commonTypes";
import { ScoreStatus } from "../components/scoreComponent";
import { assets } from "../constants/assets";
import { MenuScene } from "./menuScene";

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

    this.add.image(boardWidth / 2, boardHeight / 2, assets.ui.CARD).setScale(0.6).setAlpha(0.6);
    const xText = 240;
    const style = { color: '#FFF', font: '16px Arial' };
    const yText = 215;

    const texts = [
      `Keys Pressed: ${this.scoreStatus?.keysPressed}`,
      `Misses: ${this.scoreStatus?.misses}`,
      `Longest Streak: ${this.scoreStatus?.longestStreak}`,
      `Score: ${this.scoreStatus?.score}`,
      `WPM: ${this.scoreStatus?.wpm.toFixed(2)}`,
      `Words Typed: ${this.scoreStatus?.wordsTyped}`,
      `Precision: ${this.scoreStatus?.precision}`,
    ];

    texts.forEach((text, index) => {
      this.add.text(xText, yText + (index * 25), text, style);
    });

    const scoreGraph = this.add.text(this.cameras.main.width / 2, 440, 'See graph', { color: '#FFF', font: '20px Arial' }).setOrigin(0.5);
    scoreGraph.setInteractive();
    scoreGraph.on('pointerdown', () => {
      (window as CustomWindow).openScoreModal();

      setTimeout(() => {
        if (this.scoreStatus) {
          (window as CustomWindow).updateChart(this.scoreStatus.wpmHistory);
        }
      }, 500);
    }).on('pointerover', function () {
      backToMenuText.setAlpha(0.8);
      self.input.setDefaultCursor('pointer');
    }).on('pointerout', function () {
      backToMenuText.setAlpha(1);
      self.input.setDefaultCursor('default');
    });;

    const backToMenuText = this.add.text(this.cameras.main.width / 2, 500, 'Back to menu', { color: '#FFF', font: '20px Arial' }).setOrigin(0.5);
    backToMenuText.setInteractive();
    backToMenuText.on('pointerdown', () => {
      this.scene.start(MenuScene.key);
    }).on('pointerover', function () {
      backToMenuText.setAlpha(0.8);
      self.input.setDefaultCursor('pointer');
    }).on('pointerout', function () {
      backToMenuText.setAlpha(1);
      self.input.setDefaultCursor('default');
    });
  }

  addBackground() {
    const bg = this.textures.get('background-score').get(0);
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    const widthRatio = boardWidth / bg.width;
    const heightRatio = boardHeight / bg.height;

    const scaleFactor = Math.max(widthRatio, heightRatio);

    const img = this.add.image(boardWidth / 2, boardHeight / 2, 'background-score');
    img.setScale(scaleFactor);
  }

  addFadeAnimation() {
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    const rectangle = this.add.rectangle(0, 0, boardWidth, boardHeight, 0x000000, 1).setOrigin(0, 0).setAlpha(0);

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