import { formatTime } from '../../../utils/numbers';
import { assets } from '../../common/constants/assets';
import { gameEvents } from '../../common/constants/events';
import { ScoreScene } from '../../score/scoreScene';
import { RoundScene } from '../roundScene';

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
  lostWords: number;
  wave: number;
};

const TOTAL_POINTS_TO_LOSE = 8;

const config = {
  useTimer: false,
};

export class ScoreComponent extends Phaser.GameObjects.Container {
  status: ScoreStatus;

  text?: Phaser.GameObjects.Text;

  lastSecond: number | null;

  timer?: Phaser.Time.TimerEvent;

  timerText: Phaser.GameObjects.Text;

  hearts: Phaser.GameObjects.Image[] = [];

  currentTime: number = 0;

  lastUpdate = Date.now();

  constructor(readonly scene: Phaser.Scene, readonly x: number, readonly y: number) {
    super(scene, x, y);

    this.visible = true;

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
      lostWords: 0,
      wave: 0,
    };

    this.currentTime = (scene as RoundScene).roundConfig.timeLimit * 1000;

    this.scene.events.on(gameEvents.HIT, this.hit, this);
    this.scene.events.on(gameEvents.PRESS_MISS, this.miss, this);
    this.scene.events.on(gameEvents.WORD_COMPLETED, this.increaseWord, this);
    this.scene.events.on(gameEvents.LOST_WORD, this.lostWord, this);

    this.add(this.scene.add.image(0, 0, assets.ui.CARD).setOrigin(0, 0).setScale(0.37).setAlpha(0));
    this.text = this.scene.add.text(20, 10, '', { color: '#0F0' }).setAlpha(0);
    this.add(this.text);

    this.timerText = this.scene.add.text(0, 0, formatTime(this.currentTime), {
      fontSize: '24px',
      color: '#090',
    }).setAlpha(config.useTimer ? 1 : 0);

    this.hearts = [];
    for (let i = 0; i < TOTAL_POINTS_TO_LOSE; i += 1) {
      const heart = this.scene.add
        .image(0 + i * 20, 0, assets.icon.HEART)
        .setTint(0x00FF00)
        .setOrigin(0, 0)
        .setScale(1)
        .setAlpha(0.5);

      this.hearts.push(heart);
      this.add(heart);
    }

    if (config.useTimer) {
      this.timer = this.scene.time.addEvent({
        delay: 100,
        callback: this.updateTimer,
        callbackScope: this,
        loop: true,
      });
    }

    this.add(this.timerText);
    this.scene.add.existing(this);
  }

  destroy() {
    this.scene.events.off(gameEvents.HIT, this.hit, this);
    this.scene.events.off(gameEvents.PRESS_MISS, this.miss, this);
    this.scene.events.off(gameEvents.WORD_COMPLETED, this.increaseWord, this);
    this.scene.events.off(gameEvents.LOST_WORD, this.lostWord, this);
    super.destroy();
  }

  updateTimer() {
    this.currentTime -= 100;
    this.timerText.setText(formatTime(this.currentTime));

    if (this.currentTime <= 0) {
      this.timer?.remove(false);
      this.scene.sound.stopAll();
      this.scene.scene.start(ScoreScene.key, { score: this.status });
    }
  }

  lostWord() {
    this.status.lostWords += 1;
    const lostHeart = this.hearts.pop();
    if (lostHeart) {
      this.scene.tweens.add({
        targets: lostHeart,
        alpha: 0,
        duration: 100,
        ease: 'Sine.easeInOut',
        yoyo: false,
        repeat: 0,
        onComplete: () => {
          lostHeart.destroy();
        },
      });
    }

    if (!config.useTimer && this.status.lostWords >= TOTAL_POINTS_TO_LOSE) {
      this.scene.sound.stopAll();
      this.scene.scene.stop();
      this.scene.scene.start(ScoreScene.key, { score: this.status });
      this.destroy();
    }
  }

  hit() {
    this.status.hits += 1;
    this.status.score += 10;
    this.status.longestStreak = Math.max(this.status.longestStreak, this.status.hits);
    this.status.keysPressed += 1;

    if ('vibrate' in navigator) {
      navigator.vibrate(15);
    }
  }

  miss() {
    this.status.misses += 1;
    this.status.hits = 0;
    this.status.score -= 5;
    this.status.keysPressed += 1;
  }

  increaseWord() {
    this.status.wordsTyped += 1;
  }

  increaseWave() {
    this.status.wave += 1;
  }

  update() {
    const now = Date.now();
    this.lastUpdate = this.lastUpdate ?? now;

    const elapsedTimeInSeconds = (now - this.lastUpdate) / 1000;
    const wpm = (this.status.wordsTyped / elapsedTimeInSeconds) * 60;

    if (this.lastSecond !== Math.floor(now / 1000)) {
      this.lastSecond = Math.floor(now / 1000);
      this.status.wpmHistory.push(wpm);
    }

    this.status.wpm = wpm;

    const precision = 100 - ((this.status.misses * 100) / this.status.keysPressed);
    this.status.precision = `${Number.isNaN(precision) ? '0.00' : (precision).toFixed(2)}%`;
    const texts = [
      `Hits: ${this.status.hits}`,
      `Misses: ${this.status.misses}`,
      `Score: ${this.status.score}`,
      `WPM: ${wpm.toFixed(2)}`,
      `Longest streak: ${this.status.longestStreak}`,
      `Precision: ${this.status.precision}%`,
      `Words typed: ${this.status.wordsTyped}`,
      `Time: ${formatTime(this.currentTime)}`,
    ];

    this.text?.setText(texts.join('\n'));
  }
}
