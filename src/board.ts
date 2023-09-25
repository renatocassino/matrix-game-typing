import Phaser from "phaser";
import { getRandomWord } from "./randomWord";
import { Score } from "./score";
import { Config } from "./types";
import { Word } from "./word";

// TODO
// Add a better animation to background
// Organize the score layout
// Add waves
// Create a new scene with score and save in localstorage
// Add a better background
// Try to save the WPM in each second to generate a graph
// Add an initial menu
// Fix delta

export class Board extends Phaser.Scene {
  words: Word[] = [];
  worldConfig: Config;
  lastUpdate = Date.now();
  currentWord?: Word;
  score: Score;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super(config);

    this.worldConfig = {
      letterSize: 20,
    }

    this.score = new Score(this);
  }

  preload() {
    this.load.image('background', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/79896fac-6256-4fb9-a9de-bc6b364f6621/d4aftpb-9fbdee50-be0d-4d45-b23d-eae4fb8524ec.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzc5ODk2ZmFjLTYyNTYtNGZiOS1hOWRlLWJjNmIzNjRmNjYyMVwvZDRhZnRwYi05ZmJkZWU1MC1iZTBkLTRkNDUtYjIzZC1lYWU0ZmI4NTI0ZWMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FEFDqThHO0K-EuHuxvAVPZrVPVQXr6kJ6sQECp6VenE');
  }

  create() {
    const background = this.add.image(0, 0, 'background');
    background.setOrigin(0, 0);
    background.setAlpha(0.1);

    this.tweens.add({
      targets: background,
      alpha: 0.5,
      duration: 1000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
      // angle: 90
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

    if (!this.currentWord) {
      this.currentWord = this.words.find(word => word.word[0] === keyCode);
      if (this.currentWord) {
        this.currentWord.status = 'active';
        this.currentWord.keyNextLetter();
        this.score.hit();
        return;
      }

      this.score.miss();

      return;
    }

    if (this.currentWord.word[this.currentWord.indexTyped] === keyCode) {
      this.currentWord.keyNextLetter();
      this.score.hit();
      return;
    }

    this.score.miss();
  }

  update() {
    this.score.update();
    const now = Date.now();
    const delta = now - this.lastUpdate;

    // console.log(delta, now, this.lastUpdate)

    if (delta > 1000 || this.words.length === 0) {
      this.lastUpdate = now;

      console.log('Creating new word')

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
