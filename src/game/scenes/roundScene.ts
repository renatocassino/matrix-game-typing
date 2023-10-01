import { Config, GameLevel, GameMode, RoundConfig, WordMode } from "../../types";
import { isMobile } from "../../utils/isMobile";
import { getRandomLetter, getRandomWord } from "../../utils/randomWord";
import { PauseToggleButton } from "../components/pauseToggleButton";
import { ScoreComponent } from "../components/scoreComponent";
import { VirtualKeyboard } from "../components/virtualKeyboard";
import { VolumeButton } from "../components/volumeButton";
import { WordComponent } from "../components/wordComponent";
import { assets } from "../constants/assets";
import { gameEvents } from "../constants/events";
import { SettingsType } from "../settings";

// TODO
// Add waves - Wave 1 easy, wave 2 medium, wave 3 hard
// Make a menu when pause with option to stop sounds, restart, etc
// Add a timer before start with time of music (na virada)
// Add special power
// Create modules to round, example: Just letters, just words with ASD, just words with ASDFGLKJH
// Add ads :)
// Decide a name to game
// Buy a domain

export class RoundScene extends Phaser.Scene {
  static readonly key = 'BoardScene';
  words: WordComponent[] = [];
  worldConfig: Config;
  lastUpdate = Date.now();
  currentWord?: WordComponent;
  score!: ScoreComponent;
  cursor!: Phaser.GameObjects.Rectangle;
  emitter: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();
  roundConfig: RoundConfig;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: RoundScene.key, ...(config ?? {}) });

    this.roundConfig = {
      gameMode: GameMode.Words,
      timeLimit: 60,
      level: GameLevel.Easy,
      wordMode: WordMode.Duration,
      wordDropInterval: 800,
    };

    if (this.roundConfig.gameMode === GameMode.Letters) {
      this.roundConfig.wordDropInterval = 300;
    }

    this.worldConfig = {
      letterSize: 20,
    };
  }

  create() {
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    const settings = this.game.registry.get('_settingsValue') as SettingsType;
    const background = this.add.image(boardWidth / 2, boardHeight / 2, assets.bg.GAME_BACKGROUND).setOrigin(0.5, 0.5).setAlpha(0.1).setScale(1.5);

    this.words = [];
    this.currentWord = undefined;

    this.sound.play(assets.audio.GAME_MUSIC, { volume: settings.musicVolume, loop: true });

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
    this.score = new ScoreComponent(this, 10, 10);

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
    this.emitter.on(gameEvents.WORD_COMPLETED, () => {
      this.currentWord = undefined;
    });

    if (isMobile()) {
      new VirtualKeyboard(this, 0, this.sys.game.canvas.height - 150);
    }
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

    const usedLetters = this.words.map(word => word.word[0]);

    const word = this.roundConfig.gameMode === GameMode.Words ? getRandomWord(usedLetters) : getRandomLetter(usedLetters);

    if (word) {
      const x = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
      this.words.push(new WordComponent(this, word.toLowerCase(), x * this.worldConfig.letterSize, 0, x));
    }
  }

  keyPress(event: KeyboardEvent) {
    if (this.game.isPaused) {
      return;
    }
    const keyCode = event.key;
    if (!keyCode.match(/^[a-z0-9]$/i)) {
      return
    }
    console.log(this.currentWord?.word, keyCode, this.currentWord?.word[this.currentWord?.indexTyped]);

    if (!this.currentWord) {
      this.currentWord = this.words.find(word => word.word[0] === keyCode);
      if (this.currentWord) {
        this.currentWord.status = 'active';
        this.currentWord.keyNextLetter();
        this.emitter.emit(gameEvents.HIT);
        return;
      }

      this.emitter.emit(gameEvents.PRESS_MISS);
      return;
    }

    if (this.currentWord.word[this.currentWord.indexTyped] === keyCode) {
      this.emitter.emit(gameEvents.HIT);
      this.currentWord.keyNextLetter();

      return;
    }

    this.emitter.emit(gameEvents.PRESS_MISS);
  }

  update() {
    this.score.update();
    const now = Date.now();
    const delta = now - this.lastUpdate;

    if (delta > this.roundConfig.wordDropInterval || this.words.length === 0) {
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
