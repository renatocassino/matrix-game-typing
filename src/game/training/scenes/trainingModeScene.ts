import { TrainingLevel } from '../levels';

export class TrainingModeScene extends Phaser.Scene {
  static readonly key = 'TrainingModeScene';

  // words: WordComponent[] = [];

  // currentWave: number = 0;

  // worldConfig: Config;

  // lastUpdate = Date.now();

  // currentWord?: WordComponent;

  // score!: ScoreComponent;

  // cursor!: Phaser.GameObjects.Rectangle;

  // emitter: Phaser.Events.EventEmitter = new Phaser.Events.EventEmitter();

  // roundConfig: RoundConfig;

  // currentWordText!: Phaser.GameObjects.Text;

  // status: 'playing' | 'waveAnimation' | 'start' = 'start';

  // wordsLeftToFall: number = 0;

  // timeToNextWord: number = 0;

  level!: TrainingLevel;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: TrainingModeScene.key, ...(config ?? {}) });

    // this.roundConfig = {
    //   gameMode: GameMode.Words,
    //   timeLimit: 60,
    //   wordMode: WordMode.Duration,
    //   waves: generateWaves(0),
    // };

    // this.worldConfig = {
    //   letterSize: 20,
    // };
  }

  init(data: { level: TrainingLevel }) {
    this.level = data.level;
  }

  // get currentWaveConfig() {
  //   if (!this.level) {
  //     throw new Error('Level is not defined');
  //   }

  //   const wave = this.currentWave;
  //   return this.level.waves[wave];
  // }

  // create() {
  //   this.status = 'start';
  //   this.currentWave = 0;

  //   const boardWidth = this.sys.game.canvas.width;

  //   const background = new BackgroundImage(this, assets.bg.GAME_BACKGROUND).setAlpha(0.1);

  //   this.words = [];
  //   this.currentWord = undefined;

  //   this.tweens.add({
  //     targets: background,
  //     alpha: 0.3,
  //     duration: 1000,
  //     ease: 'Sine.easeInOut',
  //     yoyo: true,
  //     repeat: -1,
  //   });

  //   this.input.keyboard?.on('keydown', this.keyPress.bind(this));

  //   new VolumeButton(this, this.sys.game.canvas.width - 60, 20);
  //   new PauseToggleButton(this, this.sys.game.canvas.width - 30, 20);

  //   this.score = new ScoreComponent(this, 10, 10);

  //   this.emitter.on(gameEvents.PRESS_MISS, () => {
  //     this.sound.play(assets.audio.KEYWRONG);
  //   });
  //   this.emitter.on(gameEvents.WORD_COMPLETED, () => {
  //     this.currentWord = undefined;
  //   });

  //   this.emitter.on(gameEvents.PAUSE, () => {
  //     this.scene.launch(RoundModal.key);
  //     this.scene.bringToTop(RoundModal.key);

  //     const modalScene = this.scene.get(RoundModal.key);
  //     modalScene.events.once('create', () => {
  //       this.scene.pause();
  //     });
  //   }, this);

  //   if (isMobile()) {
  //     new VirtualKeyboard(this, 0, this.sys.game.canvas.height - 150);
  //   }

  //   this.currentWordText = this
  //     .add
  //     .text(boardWidth / 2, 5, '',
  // { color: '#090', fontFamily: '\'Orbitron\'', fontSize: '12px' })
  //     .setOrigin(0.5, 0)
  //     .setAlpha(0.6);

  //   this.events.once('shutdown', () => {
  //     this.input.keyboard?.off('keydown', this.keyPress.bind(this));
  //     this.emitter.removeAllListeners();
  //     this.sound.stopAll();
  //     this.scene.setActive(false);
  //   }, this);
  // }

  // createNewWord() {
  //   if (this.wordsLeftToFall === 0) {
  //     return;
  //   }

  //   this.timeToNextWord = 1000;

  //   const boardSize = this.sys.game.canvas.width;
  //   const min = 3;
  //   const max = Math.floor(boardSize / this.worldConfig.letterSize) - 3;
  //   const allXs = Array.from({ length: max - min }, (_, i) => i + min);
  //   const usedX = new Set(this.words.map((word) => word.indexXPosition));

  //   const possiblePositions = allXs.filter((num) => !usedX.has(num));
  //   if (possiblePositions.length === 0) {
  //     return;
  //   }

  //   const wave = this.currentWaveConfig;
  //   const word = wave.words[Math.floor(Math.random() * wave.words.length)];

  //   if (!word) {
  //     return;
  //   }

  //   this.wordsLeftToFall -= 1;
  //   const x = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
  //   this.words.push(
  //     new WordComponent(
  //       this,
  //       word.toLowerCase(),
  //       x * this.worldConfig.letterSize,
  //       0,
  //       x,
  //       1,
  //       this.worldConfig.letterSize,
  //     ),
  //   );
  // }

  // keyPress(event: KeyboardEvent) {
  //   if (this.game.isPaused) {
  //     return;
  //   }
  //   const keyCode = event.key;
  //   if (!keyCode.match(/^[a-z0-9]$/i)) {
  //     return;
  //   }

  //   if (!this.currentWord) {
  //     this.currentWord = this.words
  //       .find((word) => word.word[0].toUpperCase() === keyCode.toUpperCase());
  //     if (this.currentWord) {
  //       this.currentWord.status = 'active';
  //       this.currentWord.keyNextLetter();
  //       this.emitter.emit(gameEvents.HIT);
  //       return;
  //     }

  //     this.emitter.emit(gameEvents.PRESS_MISS);
  //     return;
  //   }

  //   const letter = this.currentWord.word[this.currentWord.indexTyped].toUpperCase();
  //   if (letter === keyCode.toUpperCase()) {
  //     this.emitter.emit(gameEvents.HIT);
  //     this.currentWord.keyNextLetter();

  //     return;
  //   }

  //   this.emitter.emit(gameEvents.PRESS_MISS);
  // }

  // nextWave() {
  //   this.status = 'waveAnimation';
  //   this.currentWave += 1;
  //   this.words.forEach((word) => word.destroy());
  //   this.words = [];
  //   this.currentWord = undefined;
  //   // this.wordsLeftToFall = this.currentWaveConfig.wordsToType;
  //   this.score.increaseWave();

  //   this.scene.launch(WaveScene.key, {
  //     wave: this.currentWave,
  //     cb: () => {
  //       this.status = 'playing';
  //     },
  //   });
  // }

  // update() {
  //   if (!this.scene.isActive()) return;

  //   if (this.status === 'start') {
  //     this.nextWave();
  //     return;
  //   }
  //   if (this.status === 'waveAnimation') {
  //     return;
  //   }
  //   this.score.update();
  //   this.currentWordText.setText(this.currentWord?.word.toUpperCase() ?? '');

  //   if (this.wordsLeftToFall === 0 && this.words.length === 0) {
  //     this.nextWave();
  //     return;
  //   }

  //   const now = Date.now();
  //   const delta = now - this.lastUpdate;

  //   if (delta > this.timeToNextWord || this.words.length === 0) {
  //     this.lastUpdate = now;
  //     this.createNewWord();
  //   }

  //   this.words.forEach((word) => {
  //     word.update();

  //     if (word.shouldRemove()) {
  //       word.destroy();
  //       if (this.currentWord === word) {
  //         this.currentWord = undefined;
  //       }
  //       this.words = this.words.filter((w) => w !== word);
  //     }
  //   });
  // }
}
