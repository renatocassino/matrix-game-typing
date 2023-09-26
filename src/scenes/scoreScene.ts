import { ScoreStatus } from "../components/score";


export class ScoreScene extends Phaser.Scene {
  scoreStatus?: ScoreStatus;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: 'Score', ...(config ?? {}) });
  }

  init(data: { score: ScoreStatus }) {
    this.scoreStatus = data.score;
  }

  create() {
    this.cameras.main.fadeIn(300);
    this.addBackground();
    this.addFadeAnimation();
    this.addPlayButton();
    this.addScoreStatus();
  }

  addScoreStatus() {
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    this.add.image(boardWidth / 2, boardHeight / 2, 'card').setScale(0.6).setAlpha(0.6);
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

  addPlayButton() {
  }

  update() {
  }
}