import Phaser from "phaser";
import { getRandomWord } from "./randomWord";
import { Config } from "./types";
import { Word } from "./word";

export class Board extends Phaser.Scene {
  words: Word[] = [];
  worldConfig: Config;
  lastUpdate = Date.now();
  currentWord?: Word;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);

    this.worldConfig = {
      letterSize: 16,
    }
  }

  create() {
    // this.text = this.add.text(0, 0, 'Hello Phaser!', { color: '#0F0' });
    // this.text.setOrigin(0, 0.5);
    // this.text.setRotation(1.6);

    // const particles = this.add.particles(200, 200, 'red', {
    //   speed: 100,
    //   scale: { start: 1, end: 0 },
    //   blendMode: 'ADD',
    // });

    this.input.keyboard?.on('keydown', this.keyPress.bind(this));
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
        return;
      }
      x = Math.floor(Math.random() * boardSize / this.worldConfig.letterSize);
    }

    const word = getRandomWord(this.words.map(word => word.word[0]));
    if (!word) {
      return;
    }
    this.words.push(new Word(this, word.toLowerCase(), x));
  }

  keyPress(event: KeyboardEvent) {
    const keyCode = event.key;

    if (!this.currentWord) {
      this.currentWord = this.words.find(word => word.word[0] === keyCode);
      if (this.currentWord) {
        this.currentWord.status = 'active';
        this.currentWord.keyNextLetter();
      }

      return;
    }

    if (this.currentWord.word[this.currentWord.indexTyped] === keyCode) {
      this.currentWord.keyNextLetter();
    }
  }

  update() {
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
}
