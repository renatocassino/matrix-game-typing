import { Config } from "../../types";
import { getRandomWord } from "../../utils/randomWord";
import { PauseToggleButton } from "../components/pauseToggleButton";
import { Score } from "../components/score";
import { VolumeButton } from "../components/volumeButton";
import { Word } from "../components/word";
import { assets } from "../constants/assets";
import { gameEvents } from "../constants/events";

// TODO
// Add waves - Wave 1 easy, wave 2 medium, wave 3 hard
// make a light following the words (this is too dificult)
// Make an action to play again
// Make a menu when pause with option to stop sounds, restart, etc
// Add a timer before start with time of music (na virada)
// Words start fall faster and in final slow down
// Dowload all assets in Menu Scene
// Add special power
// Add multiple languages
// Create a keyboard when is mobile

export class BoardScene extends Phaser.Scene {
  words: Word[] = [];
  worldConfig: Config;
  lastUpdate = Date.now();
  currentWord?: Word;
  score!: Score;
  cursor!: Phaser.GameObjects.Rectangle;
  emitter: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: 'Board', ...(config ?? {}) });

    this.worldConfig = {
      letterSize: 20,
    }
  }

  create() {
    const background = this.add.image(0, -600, assets.bg.GAME_BACKGROUND);
    background.setOrigin(0, 0);
    background.setAlpha(0.1);

    this.words = [];
    this.currentWord = undefined;

    this.sound.play(assets.audio.GAME_MUSIC, { volume: 0.5 });

    this.tweens.add({
      targets: background,
      alpha: 0.3,
      duration: 1000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });

    this.input.keyboard?.on('keydown', this.keyPress.bind(this));

    new VolumeButton(this, this.sys.game.canvas.width - 60, 20);
    new PauseToggleButton(this, this.sys.game.canvas.width - 30, 20);
    this.score = new Score(this, 10, 10);

    // const emitter = this.add.particles(0, 0, 'flares', {
    //   frame: { frames: ['white'], },
    //   blendMode: 'ADD',
    //   lifespan: 500,
    //   quantity: 3,
    //   alpha: 0.4,
    //   scale: { start: 0.15, end: 0.01 }
    // });

    // this.cursor = this.add.rectangle(0, 0, this.worldConfig.letterSize / 2, this.worldConfig.letterSize, 0xffffff, 1).setAlpha(0.5);

    // emitter.startFollow(this.cursor);

    // this.tweens.add({
    //   targets: this.cursor,
    //   alpha: 0.1,
    //   duration: 1000,
    //   ease: 'Sine.easeInOut',
    //   yoyo: true,
    //   repeat: -1,
    // });

    this.emitter.on(gameEvents.PRESS_MISS, () => {
      this.sound.play(assets.audio.KEYWRONG);
    });
  }

  createNewWord() {
    const boardSize = this.sys.game.canvas.width;
    const min = 1;
    const max = Math.floor(boardSize / this.worldConfig.letterSize);
    const allXs = Array.from({ length: max - min }, (_, i) => i + min);
    const usedX = new Set(this.words.map(word => word.indexXPosition));

    const possiblePositions = allXs.filter(num => !usedX.has(num));
    if (possiblePositions.length === 0) {
      return;
    }

    const x = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];

    const word = getRandomWord(this.words.map(word => word.word[0]));
    if (!word) {
      console.log('Not found any word :/')
      return;
    }
    this.words.push(new Word(this, word.toLowerCase(), x * this.worldConfig.letterSize, 0, x));
  }

  keyPress(event: KeyboardEvent) {
    const keyCode = event.key;
    if (!keyCode.match(/^[a-z0-9]$/i)) {
      return
    }

    if (!this.currentWord) {
      this.currentWord = this.words.find(word => word.word[0] === keyCode);
      if (this.currentWord) {
        this.currentWord.status = 'active';
        this.emitter.emit(gameEvents.HIT);
        return;
      }

      this.emitter.emit(gameEvents.PRESS_MISS);
      return;
    }

    if (this.currentWord.word[this.currentWord.indexTyped] === keyCode) {
      this.emitter.emit(gameEvents.HIT);
      return;
    }

    this.emitter.emit(gameEvents.PRESS_MISS);
  }

  update() {
    this.score.update();
    const now = Date.now();
    const delta = now - this.lastUpdate;

    if (delta > 1000 || this.words.length === 0) {
      this.lastUpdate = now;
      this.createNewWord();
    }

    this.words.forEach(word => {
      word.update();

      if (word.shouldRemove()) {
        word.remove();
        if (this.currentWord === word) {
          this.currentWord = undefined;
        }
        this.words = this.words.filter(w => w !== word);
      }
    });
  }

  shutdown() {
    this.words.forEach(word => word.remove());

    this.score.destroy();
    this.currentWord = undefined;
    this.sound.stopAll();
  }
}
