import { LetterStatus, WordStatus } from "../../types";
import { generateRandomInteger } from "../../utils/numbers";
import { assets } from "../constants/assets";
import { gameEvents } from "../constants/events";
import { BoardScene } from "../scenes/boardScene";
import { Settings } from "../settings";
import { LetterComponent } from "./letterComponent";

export class WordComponent extends Phaser.GameObjects.Container {
  letters: LetterComponent[] = [];
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

  constructor(private readonly board: BoardScene, readonly word: string, readonly x: number, y: number, readonly indexXPosition: number) {
    super(board, x, y)
    this.status = 'inactive';

    const boardHeight = this.board.sys.game.canvas.height;
    const finalY = boardHeight;
    this.velocity = generateRandomInteger(0.5, 1.3);

    this.y = board.worldConfig.letterSize * word.length * -1;
    this.velocityConfig = {
      finalY,
      initialY: this.y,
      duration: generateRandomInteger(700, 1200),
      currentTime: 0,
    };

    this.word.split('').forEach((letter, index) => {
      const currentLetter = new LetterComponent(this.board, letter, index, this);
      this.letters.push(currentLetter);
      this.add(currentLetter);
    });

    this.board.emitter.on(gameEvents.HIT, this.keyNextLetter.bind(this));

    board.add.existing(this);
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

    this.letters.forEach(letter => letter.update());
    this.lastUpdate = Date.now();
  }

  keyNextLetter() {
    const settings = this.board.game.registry.get('settings') as Settings;

    if (this.status !== 'active') {
      return;
    }

    this.board.sound.play(assets.audio.KEYPRESS, { volume: settings.getConfig('fxVolume') });
    if (this.indexTyped === -1) {
      this.indexTyped = 0;
    }

    this.letters[this.indexTyped].status = LetterStatus.Typed;
    this.indexTyped++;

    ['n0', 'n1'].forEach((n) => {
      this.add(this.board.add.particles(
        0,
        (this.indexTyped * this.board.worldConfig.letterSize),
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
      ));
    });

    // this.board.add.particles(this.x * size, this.y + (this.indexTyped * this.board.worldConfig.letterSize), 'invalid', {
    //   speed: 100,
    //   scale: { start: 1, end: 0 },
    //   duration: 200,
    //   blendMode: 'ADD',
    //   alpha: 0.2,
    // });

    if (this.indexTyped === this.word.length) {
      this.board.sound.play(assets.audio.EXPLOSION_SMALL, { volume: settings.getConfig('fxVolume') });
      this.status = 'completed';
      this.emit(gameEvents.WORD_COMPLETED, this);

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

  // @ts-ignore
  remove() {
    this.letters.forEach(letter => letter.text.destroy());
    this.destroy();
    // const size = this.board.worldConfig.letterSize;
    // this.board.add.particles(this.x * size, this.y + (this.letters.length * this.board.worldConfig.letterSize), 'red', {
    //   speed: 100,
    //   scale: { start: 1, end: 0 },
    //   duration: 200,
    //   blendMode: 'ADD',
    // });
  }
}
