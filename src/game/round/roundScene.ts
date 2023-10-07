import {
  Config, GameDifficult, GameMode, RoundConfig, WordMode,
} from '../../types';
import { isMobile } from '../../utils/isMobile';
import { getRandomLetter, getRandomWord } from '../../utils/randomWord';
import { BackgroundImage } from '../common/components/ui/backgroundImage';
import { assets } from '../common/constants/assets';
import { gameEvents } from '../common/constants/events';
import { SettingsType } from '../common/settings';
import { WaveScene } from './animations/waveScene';
import { PauseToggleButton } from './components/pauseToggleButton';
import { ScoreComponent } from './components/scoreComponent';
import { RoundModal } from './components/ui/RoundModal';
import { VirtualKeyboard } from './components/virtualKeyboard';
import { VolumeButton } from './components/volumeButton';
import { WordComponent } from './components/wordComponent';

// TODO
// Add special power
// Add sequence feedback and multiply score
// Create modules to round, example: Just letters, just words with ASD, just words with ASDFGLKJH
// Add ads :)
// Decide a name to game
// Buy a domain
// Credits

function generateWaves(numWaves: number): RoundConfig['waves'] {
  const waves = [];

  for (let i = 1; i <= numWaves; i += 1) {
    const logFactor = Math.log(i + 1);

    const wave = {
      velocity: {
        min: Math.max(0.8 * (i * 0.02), 1),
        max: Math.min(1 + (i * logFactor), 2),
      },
      waveNumber: i,
      // TODO - add min and max and randomize in wordDropInterval
      wordDropInterval: Math.max(900 - (i * 100 * logFactor), 400),
      wordsToType: Math.floor(Math.min(5 + (i * logFactor), 40)),
      wordConfig: {
        size: {
          min: Math.floor(Math.min(Math.max(1, (i - 1) * logFactor), 5)),
          max: (i * 2) + 2,
        },
      },
    };
    waves.push(wave);
  }

  return waves;
}

export class RoundScene extends Phaser.Scene {
  static readonly key = 'BoardScene';

  words: WordComponent[] = [];

  currentWave: number = 0;

  worldConfig: Config;

  lastUpdate = Date.now();

  currentWord?: WordComponent;

  score!: ScoreComponent;

  cursor!: Phaser.GameObjects.Rectangle;

  emitter: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();

  roundConfig: RoundConfig;

  currentWordText!: Phaser.GameObjects.Text;

  status: 'playing' | 'waveAnimation' | 'start' = 'start';

  wordsLeftToFall: number = 0;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: RoundScene.key, ...(config ?? {}) });

    this.roundConfig = {
      gameMode: GameMode.Words,
      timeLimit: 60,
      level: GameDifficult.Easy,
      wordMode: WordMode.Duration,
      wordDropInterval: 800,
      maxFailures: 5,
      waves: generateWaves(80),
    };

    if (this.roundConfig.gameMode === GameMode.Letters) {
      this.roundConfig.wordDropInterval = 300;
    }

    this.worldConfig = {
      letterSize: 20,
    };
  }

  get currentWaveConfig() {
    if (!this.roundConfig.waves) {
      throw new Error('No waves defined');
    }

    return this.roundConfig.waves[
      Math.min(this.currentWave - 1, this.roundConfig.waves.length - 1)
    ];
  }

  create() {
    this.status = 'start';
    this.currentWave = 0;

    const boardWidth = this.sys.game.canvas.width;

    const settings = this.game.registry.get('_settingsValue') as SettingsType;
    const background = new BackgroundImage(this, assets.bg.GAME_BACKGROUND).setAlpha(0.1);

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

    // this.cursor = this.add.rectangle(
    //   0, 0, this.worldConfig.letterSize / 2,
    //   this.worldConfig.letterSize, 0xffffff, 1).setAlpha(0.5);

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

    this.emitter.on(gameEvents.PAUSE, () => {
      this.scene.launch(RoundModal.key);
      this.scene.bringToTop(RoundModal.key);

      const modalScene = this.scene.get(RoundModal.key);
      modalScene.events.once('create', () => {
        this.scene.pause();
      });
    }, this);

    if (isMobile()) {
      new VirtualKeyboard(this, 0, this.sys.game.canvas.height - 150);
    }

    this.currentWordText = this
      .add
      .text(boardWidth / 2, 5, '', { color: '#090', fontFamily: '\'Orbitron\'', fontSize: '12px' })
      .setOrigin(0.5, 0)
      .setAlpha(0.6);

    this.events.once('shutdown', () => {
      this.input.keyboard?.off('keydown', this.keyPress.bind(this));
      this.emitter.removeAllListeners();
      this.sound.stopAll();
      this.scene.setActive(false);
    }, this);
  }

  createNewWord() {
    if (this.wordsLeftToFall === 0) {
      return;
    }

    const boardSize = this.sys.game.canvas.width;
    const min = 3;
    const max = Math.floor(boardSize / this.worldConfig.letterSize) - 3;
    const allXs = Array.from({ length: max - min }, (_, i) => i + min);
    const usedX = new Set(this.words.map((word) => word.indexXPosition));

    const possiblePositions = allXs.filter((num) => !usedX.has(num));
    if (possiblePositions.length === 0) {
      return;
    }

    const usedLetters = this.words.map((word) => word.word[0]);

    const wave = this.currentWaveConfig;
    const word = this.roundConfig.gameMode === GameMode.Words
      ? getRandomWord(usedLetters, wave.wordConfig.size.min, wave.wordConfig.size.max)
      : getRandomLetter(usedLetters);

    if (!word) {
      return;
    }

    this.wordsLeftToFall -= 1;
    const x = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
    this.words.push(
      new WordComponent(
        this,
        word.toLowerCase(),
        x * this.worldConfig.letterSize,
        0,
        x,
      ),
    );
  }

  keyPress(event: KeyboardEvent) {
    if (this.game.isPaused) {
      return;
    }
    const keyCode = event.key;
    if (!keyCode.match(/^[a-z0-9]$/i)) {
      return;
    }

    if (!this.currentWord) {
      this.currentWord = this.words
        .find((word) => word.word[0].toUpperCase() === keyCode.toUpperCase());
      if (this.currentWord) {
        this.currentWord.status = 'active';
        this.currentWord.keyNextLetter();
        this.emitter.emit(gameEvents.HIT);
        return;
      }

      this.emitter.emit(gameEvents.PRESS_MISS);
      return;
    }

    const letter = this.currentWord.word[this.currentWord.indexTyped].toUpperCase();
    if (letter === keyCode.toUpperCase()) {
      this.emitter.emit(gameEvents.HIT);
      this.currentWord.keyNextLetter();

      return;
    }

    this.emitter.emit(gameEvents.PRESS_MISS);
  }

  nextWave() {
    this.status = 'waveAnimation';
    this.currentWave += 1;
    this.words.forEach((word) => word.destroy());
    this.words = [];
    this.currentWord = undefined;
    this.wordsLeftToFall = this.currentWaveConfig.wordsToType;
    this.score.increaseWave();

    this.scene.launch(WaveScene.key, {
      wave: this.currentWave,
      cb: () => {
        this.status = 'playing';
      },
    });
  }

  update() {
    if (!this.scene.isActive()) return;

    if (this.status === 'start') {
      this.nextWave();
      return;
    }
    if (this.status === 'waveAnimation') {
      return;
    }
    this.score.update();
    this.currentWordText.setText(this.currentWord?.word.toUpperCase() ?? '');

    if (this.wordsLeftToFall === 0 && this.words.length === 0) {
      this.nextWave();
      return;
    }

    const now = Date.now();
    const delta = now - this.lastUpdate;

    if (delta > this.roundConfig.wordDropInterval || this.words.length === 0) {
      this.lastUpdate = now;
      this.createNewWord();
    }

    this.words.forEach((word) => {
      word.update();

      if (word.shouldRemove()) {
        word.destroy();
        if (this.currentWord === word) {
          this.currentWord = undefined;
        }
        this.words = this.words.filter((w) => w !== word);
      }
    });
  }
}
