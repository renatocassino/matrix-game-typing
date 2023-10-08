import {
  Config,
  GameMode,
  RoundConfig,
  WordMode,
} from '../../types';
import { isMobile } from '../../utils/isMobile';
import { generateRandom, generateRandomInteger } from '../../utils/numbers';
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
import { generateWaves } from './helpers/generateWaves';

// TODO
// Add special power
// Add sequence feedback and multiply score
// Create modules to round, example: Just letters, just words with ASD, just words with ASDFGLKJH

export class RoundScene extends Phaser.Scene {
  static readonly key = 'BoardScene';

  words: WordComponent[] = [];

  currentWave: number = 0;

  worldConfig: Config;

  lastUpdate = Date.now();

  currentWord?: WordComponent;

  score!: ScoreComponent;

  roundConfig: RoundConfig;

  currentWordText!: Phaser.GameObjects.Text;

  status: 'playing' | 'waveAnimation' | 'start' = 'start';

  wordsLeftToFall: number = 0;

  timeToNextWord: number = 0;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: RoundScene.key, ...(config ?? {}) });

    this.roundConfig = {
      gameMode: GameMode.Words,
      timeLimit: 60,
      wordMode: WordMode.Duration,
      waves: generateWaves(80),
    };

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

    this.events.on(gameEvents.PRESS_MISS, () => {
      this.sound.play(assets.audio.KEYWRONG);
    });
    this.events.on(gameEvents.WORD_COMPLETED, () => {
      this.currentWord = undefined;
    });

    this.events.on(gameEvents.PAUSE, () => {
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
      this.events.off(gameEvents.PRESS_MISS);
      this.events.off(gameEvents.WORD_COMPLETED);
      this.events.off(gameEvents.PAUSE);

      this.sound.stopAll();
      this.scene.setActive(false);
      while (this.words.length > 0) {
        this.words.pop()?.destroy();
      }
    }, this);
  }

  createNewWord() {
    if (this.wordsLeftToFall === 0) {
      return;
    }

    this.timeToNextWord = generateRandomInteger(
      this.currentWaveConfig.wordDropInterval.min,
      this.currentWaveConfig.wordDropInterval.max,
    );

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

    const waveConfig = this.currentWaveConfig;
    const velocity = generateRandom(waveConfig.velocity.min, waveConfig.velocity.max);
    this.words.push(
      new WordComponent(
        this,
        word.toLowerCase(),
        x * this.worldConfig.letterSize,
        0,
        x,
        velocity,
        this.worldConfig.letterSize,
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
        this.events.emit(gameEvents.HIT);
        return;
      }

      this.events.emit(gameEvents.PRESS_MISS);
      return;
    }

    const letter = this.currentWord.word[this.currentWord.indexTyped].toUpperCase();
    if (letter === keyCode.toUpperCase()) {
      this.events.emit(gameEvents.HIT);
      this.currentWord.keyNextLetter();

      return;
    }

    this.events.emit(gameEvents.PRESS_MISS);
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

    if (delta > this.timeToNextWord || this.words.length === 0) {
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
