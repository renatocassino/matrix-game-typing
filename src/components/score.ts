export type ScoreStatus = {
  hits: number;
  misses: number;
  longestStreak: number;
  score: number;
  wordsTyped: number;
  keysPressed: number;
  wpm: number;
  precision: string
};


export class Score extends Phaser.GameObjects.Container {
  status: ScoreStatus;

  text?: Phaser.GameObjects.Text;
  startTime: number = Date.now();

  constructor(readonly scene: Phaser.Scene) {
    super(scene);

    this.status = {
      hits: 0,
      misses: 0,
      longestStreak: 0,
      score: 0,
      wordsTyped: 0,
      keysPressed: 0,
      wpm: 0,
      precision: '0.00%',
    };
  }

  create() {
    this.scene.add.rectangle(9, 9, 302, 102, 0x00ff00, 0.5).setOrigin(0, 0);
    this.scene.add.rectangle(10, 10, 300, 100, 0x000000, 0.5).setOrigin(0, 0);
    this.text = this.scene.add.text(10, 10, '', { color: '#0F0' });
  }

  hit() {
    this.status.hits++;
    this.status.score += 10;
    this.status.longestStreak = Math.max(this.status.longestStreak, this.status.hits);
    this.status.keysPressed++;
  }

  miss() {
    this.status.misses++;
    this.status.hits = 0;
    this.status.score -= 5;
    this.status.keysPressed++;
  }

  increateWord() {
    this.status.wordsTyped += 1;
  }

  update() {
    const now = Date.now();
    const elapsedTimeInSeconds = (now - this.startTime) / 1000;
    const wpm = (this.status.wordsTyped / elapsedTimeInSeconds) * 60;

    this.status.wpm = wpm;

    const precision = 100 - (this.status.misses * 100 / this.status.keysPressed);
    this.status.precision = `${isNaN(precision) ? '0.00' : (precision).toFixed(2)}%`;
    const texts = [
      `Hits: ${this.status.hits}`,
      `Misses: ${this.status.misses}`,
      `Score: ${this.status.score}`,
      `WPM: ${wpm.toFixed(2)}`,
      `Longest streak: ${this.status.longestStreak}`,
      `Precision: ${this.precision}%`,
    ]

    this.text?.setText(texts.join('\n'));
  }
}