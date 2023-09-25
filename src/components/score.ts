import { BoardScene } from "../scenes/boardScene";

export class Score {
  hits = 0;
  misses = 0;
  longestStreak = 0;
  score = 0;
  wordsTyped = 0;
  keysPressed = 0;

  text?: Phaser.GameObjects.Text;
  startTime: number = Date.now();

  constructor(private readonly board: BoardScene) {
  }

  create() {
    this.board.add.rectangle(9, 9, 302, 102, 0x00ff00, 0.5).setOrigin(0, 0);
    this.board.add.rectangle(10, 10, 300, 100, 0x000000, 0.5).setOrigin(0, 0);
    this.text = this.board.add.text(10, 10, '', { color: '#0F0' });
  }

  hit() {
    this.hits++;
    this.score += 10;
    this.longestStreak = Math.max(this.longestStreak, this.hits);
    this.keysPressed++;
  }

  miss() {
    this.misses++;
    this.hits = 0;
    this.score -= 5;
    this.keysPressed++;
  }

  increateWord() {
    this.wordsTyped += 1;
  }

  update() {
    const now = Date.now();
    const elapsedTimeInSeconds = (now - this.startTime) / 1000;
    const wpm = (this.wordsTyped / elapsedTimeInSeconds) * 60;

    const precision = 100 - (this.misses * 100 / this.keysPressed);
    const texts = [
      `Hits: ${this.hits}`,
      `Misses: ${this.misses}`,
      `Score: ${this.score}`,
      `WPM: ${wpm.toFixed(2)}`,
      `Longest streak: ${this.longestStreak}`,
      `Precision: ${isNaN(precision) ? '0.00' : (precision).toFixed(2)}%`,
    ]

    this.text?.setText(texts.join('\n'));
  }
}