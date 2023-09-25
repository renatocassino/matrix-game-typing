export type ScoreStatus = {
  hits: number;
  misses: number;
  longestStreak: number;
  score: number;
  wordsTyped: number;
  keysPressed: number;
  wpm: number;
  precision: string
  wpmHistory: number[];
};

export class Score extends Phaser.GameObjects.Container {
  status: ScoreStatus;

  text?: Phaser.GameObjects.Text;
  startTime: number = Date.now();
  lastSecond: number | null;

  roundTime: number = 30;

  constructor(readonly scene: Phaser.Scene) {
    super(scene);

    this.lastSecond = null;

    this.status = {
      hits: 0,
      misses: 0,
      longestStreak: 0,
      score: 0,
      wordsTyped: 0,
      keysPressed: 0,
      wpm: 0,
      precision: '0.00%',
      wpmHistory: [],
    };
  }

  create() {
    this.scene.add.image(130, 70, 'card').setScale(0.37).setAlpha(0.6);
    this.text = this.scene.add.text(20, 10, '', { color: '#0F0' });
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
    const diffTime = now - this.startTime;
    const elapsedTimeInSeconds = (now - this.startTime) / 1000;

    const secondsToRound = Math.floor(this.roundTime - diffTime / 1000);
    const wpm = (this.status.wordsTyped / elapsedTimeInSeconds) * 60;

    if (this.lastSecond !== secondsToRound) {
      this.lastSecond = secondsToRound;
      this.status.wpmHistory.push(wpm);
    }

    if (secondsToRound <= 0) {
      this.scene.sound.stopAll();
      this.scene.scene.start('Score', { score: this.status });
    }


    this.status.wpm = wpm;

    const precision = 100 - (this.status.misses * 100 / this.status.keysPressed);
    this.status.precision = `${isNaN(precision) ? '0.00' : (precision).toFixed(2)}%`;
    const texts = [
      `Hits: ${this.status.hits}`,
      `Misses: ${this.status.misses}`,
      `Score: ${this.status.score}`,
      `WPM: ${wpm.toFixed(2)}`,
      `Longest streak: ${this.status.longestStreak}`,
      `Precision: ${this.status.precision}%`,
      `Words typed: ${this.status.wordsTyped}`,
      `Time: ${Math.floor(this.roundTime - diffTime / 1000)}`,
    ]

    this.text?.setText(texts.join('\n'));
  }
}