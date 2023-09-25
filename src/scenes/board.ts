import { VolumeButton } from "../components/volumeButton";
import { getRandomWord } from "../randomWord";
import { Score } from "../score";
import { Config } from "../types";
import { Word } from "../word";

// TODO
// Organize the score layout
// Add waves
// Create a new scene with score and save in localstorage
// Try to save the WPM in each second to generate a graph
// Fix delta
// Add a scene with status
// make a light following the words

export class Board extends Phaser.Scene {
  words: Word[] = [];
  worldConfig: Config;
  lastUpdate = Date.now();
  currentWord?: Word;
  score: Score;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: 'Board', ...(config ?? {}) });

    this.worldConfig = {
      letterSize: 20,
    }

    this.score = new Score(this);
  }

  preload() {
    this.load.image('backgroundGame', 'bgs/bg-game.jpg');

    this.load.audio('keypress', 'fx/keypress.wav');
    this.load.audio('keywrong', 'fx/keywrong.mp3');
    this.load.audio('explosion-small', 'fx/explosion-small.wav');
    this.load.audio('board-music', 'fx/board-music.mp3');

    // Buttons
    this.load.svg('volume-on', 'icons/volume-on.svg');
    this.load.svg('volume-off', 'icons/volume-off.svg');

    this.load.svg('n0', '0.svg');
    this.load.svg('n1', '1.svg');

    this.add.image(20, 20, 'volume-on').setOrigin(0, 0);

    new VolumeButton(this, 400, 300);
  }

  create() {
    const background = this.add.image(0, 0, 'backgroundGame');
    background.setOrigin(0, 0);
    background.setAlpha(0.1);

    this.sound.play('board-music');

    this.tweens.add({
      targets: background,
      alpha: 0.5,
      duration: 1000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    })

    this.input.keyboard?.on('keydown', this.keyPress.bind(this));
    this.score.create();
  }

  createNewWord() {
    const boardSize = this.sys.game.canvas.width;
    let x = Math.floor(Math.random() * boardSize / this.worldConfig.letterSize);

    let shouldCreate = false;
    for (let i = 0; i < 10; i++) {
      const found = this.words.find(word => word.x === x);
      if (!found) {
        shouldCreate = true;
        break;
      }

      if (!shouldCreate) {
        console.log('Not found any position :/')
        return;
      }
      x = Math.floor(Math.random() * boardSize / this.worldConfig.letterSize);
    }

    const word = getRandomWord(this.words.map(word => word.word[0]));
    if (!word) {
      console.log('Not found any word :/')
      return;
    }
    this.words.push(new Word(this, word.toLowerCase(), x));
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
        this.currentWord.keyNextLetter();
        this.score.hit();
        return;
      }

      this.sound.play('keywrong');
      this.score.miss();

      return;
    }

    if (this.currentWord.word[this.currentWord.indexTyped] === keyCode) {
      this.currentWord.keyNextLetter();
      this.score.hit();
      return;
    }

    this.sound.play('keywrong');
    this.score.miss();
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
        this.score.increateWord();
      }
    });

  }
}
