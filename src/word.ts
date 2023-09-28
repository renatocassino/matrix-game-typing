import { assets } from "./game/constants/assets";
import { gameEvents } from "./game/constants/events";
import { Letter } from "./letter";
import { BoardScene } from "./scenes/boardScene";
import { LetterStatus, WordStatus } from "./types";
import { generateRandomInteger } from "./utils/numbers";

export class Word {
  letters: Letter[] = [];
  status: WordStatus;
  y: number;
  indexTyped = -1;
  particles: Phaser.GameObjects.Particles.ParticleEmitter[] = [];
  lastUpdate = Date.now();
  velocity: number = 0;
  velocityConfig: {
    finalY: number;
    duration: number;
    currentTime: number;
    initialY: number;
  }
  pressedWord: number = Date.now();

  constructor(private readonly board: BoardScene, readonly word: string, readonly x: number) {
    this.status = 'inactive';

    const boardHeight = this.board.sys.game.canvas.height;
    const size = this.board.worldConfig.letterSize;
    const finalY = boardHeight;
    this.velocity = generateRandomInteger(0.5, 1.3);

    this.y = board.worldConfig.letterSize * word.length * -1;
    this.velocityConfig = {
      finalY,
      initialY: this.y,
      duration: generateRandomInteger(700, 1200),
      currentTime: 0,
    };

    this.bootstrap();

    this.particles = ['n0', 'n1'].map(function (n: string) {
      return board.add.particles(
        x * size,
        0,
        n,
        {
          speed: 200,
          gravityY: 200,
          quantity: 2,
          scale: { start: 0, end: 0.2 },
          duration: 400,
          blendMode: 'ADD',
          rotate: { start: 0, end: 360 },
          alpha: 0.4,
          emitting: false,
        },
      );
    });
  }

  bootstrap() {
    this.word.split('').forEach((letter, index) => {
      const currentLetter = new Letter(this.board, letter, index, this.x, this);
      currentLetter.created();
      this.letters.push(currentLetter);
    });

    this.board.emitter.on(gameEvents.HIT, this.keyNextLetter.bind(this));
  }

  update() {
    if (Date.now() > this.pressedWord) {
      this.y += this.velocity;

      // const { finalY, duration, currentTime, initialY } = this.velocityConfig;
      // const progress = currentTime / duration;
      // const diff = finalY - initialY;
      // const elementY = initialY + diff * easeOutSmooth(progress);
      // this.y = elementY;
      this.velocityConfig.currentTime++;
    }

    this.letters.forEach(letter => letter.update(this.y));
    this.lastUpdate = Date.now();
  }

  keyNextLetter() {
    if (this.status !== 'active') {
      return;
    }

    this.board.sound.play(assets.audio.KEYPRESS);
    if (this.indexTyped === -1) {
      this.indexTyped = 0;
    }

    this.letters[this.indexTyped].status = LetterStatus.Typed;
    this.indexTyped++;

    const size = this.board.worldConfig.letterSize;
    ['n0', 'n1'].forEach((n) => {
      this.board.add.particles(
        this.x * size,
        this.y + (this.indexTyped * this.board.worldConfig.letterSize),
        n,
        {
          speed: 100,
          gravityY: 0,
          quantity: 2,
          scale: { start: 0.3, end: 0 },
          duration: 400,
          blendMode: 'ADD',
          rotate: { start: 0, end: 360 },
          alpha: { start: 0, end: 0.5 },
        },
      );
    });

    // this.board.add.particles(this.x * size, this.y + (this.indexTyped * this.board.worldConfig.letterSize), 'invalid', {
    //   speed: 100,
    //   scale: { start: 1, end: 0 },
    //   duration: 200,
    //   blendMode: 'ADD',
    //   alpha: 0.2,
    // });

    if (this.indexTyped === this.word.length) {
      this.board.sound.play(assets.audio.EXPLOSION_SMALL);
      this.status = 'completed';
      this.board.score.increateWord();

      return;
    }

    this.pressedWord = Date.now() + 30;
    this.letters[this.indexTyped].status = LetterStatus.Current;
  }

  shouldRemove() {
    if (this.status === 'completed') {
      return true;
    }

    return (
      this.y > this.velocityConfig.finalY ||
      this.velocityConfig.currentTime > this.velocityConfig.duration
    );
  }

  remove() {
    this.letters.forEach(letter => letter.text.destroy());
    // const size = this.board.worldConfig.letterSize;
    // this.board.add.particles(this.x * size, this.y + (this.letters.length * this.board.worldConfig.letterSize), 'red', {
    //   speed: 100,
    //   scale: { start: 1, end: 0 },
    //   duration: 200,
    //   blendMode: 'ADD',
    // });
  }
}
