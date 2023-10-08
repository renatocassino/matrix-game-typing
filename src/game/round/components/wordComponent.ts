import { LetterStatus, WordStatus } from '../../../types';
import { generateRandomInteger } from '../../../utils/numbers';
import { assets } from '../../common/constants/assets';
import { gameEvents } from '../../common/constants/events';
import { Settings } from '../../common/settings';
import { LetterComponent } from './letterComponent';

export class WordComponent extends Phaser.GameObjects.Container {
  letters: LetterComponent[] = [];

  status: WordStatus;

  y: number;

  indexTyped = -1;

  particles: Phaser.GameObjects.Particles.ParticleEmitter[] = [];

  lastUpdate = Date.now();

  velocityConfig: {
    finalY: number;
    duration: number;
    currentTime: number;
    initialY: number;
  };

  pressedWord: number = Date.now();

  constructor(
    readonly scene: Phaser.Scene,
    readonly word: string,
    readonly x: number,
    y: number,
    readonly indexXPosition: number,
    public readonly velocity: number,
    readonly letterSize: number,
  ) {
    super(scene, x, y);
    this.status = 'inactive';

    const boardHeight = this.scene.sys.game.canvas.height;
    const finalY = boardHeight;

    this.y = letterSize * word.length * -1;
    this.velocityConfig = {
      finalY,
      initialY: this.y,
      duration: generateRandomInteger(700, 1200),
      currentTime: 0,
    };

    this.word.split('').forEach((letter, index) => {
      const currentLetter = new LetterComponent(this.scene, letter, index, this, letterSize);
      this.letters.push(currentLetter);
      this.add(currentLetter);
    });

    this.scene.add.existing(this);
  }

  update() {
    if (Date.now() > this.pressedWord) {
      this.y += this.velocity;
      this.velocityConfig.currentTime += 1;
    }

    this.letters.forEach((letter) => letter.update());
    this.lastUpdate = Date.now();
  }

  keyNextLetter() {
    const settings = this.scene.game.registry.get('settings') as Settings;

    if (this.status !== 'active') {
      return;
    }

    this.scene.sound.play(assets.audio.KEYPRESS, { volume: settings.getConfig('fxVolume') });
    if (this.indexTyped === -1) {
      this.indexTyped = 0;
    }

    this.letters[this.indexTyped].status = LetterStatus.Typed;
    this.indexTyped += 1;

    ['n0', 'n1'].forEach((n) => {
      this.add(this.scene.add.particles(
        0,
        (this.indexTyped * this.letterSize),
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

    // this.board.add.particles(this.x * size,
    // this.y + (this.indexTyped * this.board.worldConfig.letterSize), 'invalid', {
    //   speed: 100,
    //   scale: { start: 1, end: 0 },
    //   duration: 200,
    //   blendMode: 'ADD',
    //   alpha: 0.2,
    // });

    if (this.indexTyped === this.word.length) {
      this.scene.sound.play(assets.audio.EXPLOSION_SMALL, { volume: settings.getConfig('fxVolume') });
      this.status = 'completed';
      this.scene.events.emit(gameEvents.WORD_COMPLETED, this);

      return;
    }

    this.pressedWord = Date.now() + 30;
    this.letters[this.indexTyped].status = LetterStatus.Current;
  }

  shouldRemove() {
    if (this.status === 'completed') {
      return true;
    }

    const disappeared = (
      this.y > this.velocityConfig.finalY
    );

    if (disappeared) {
      this.scene.events.emit(gameEvents.LOST_WORD, this);
    }

    return disappeared;
  }

  destroy() {
    this.letters.forEach((letter) => letter.destroy());
    super.destroy();
  }
}
