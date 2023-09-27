import { PauseToggleButton } from "../components/pauseToggleButton";
import { Score } from "../components/score";
import { VolumeButton } from "../components/volumeButton";
import { assets } from "../constants/assets";
import { getRandomWord } from "../randomWord";
import { Config } from "../types";
import { Word } from "../word";

// TODO
// Add waves - Wave 1 easy, wave 2 medium, wave 3 hard
// Save last status in localstorage
// make a light following the words (this is too dificult)
// Make an action to play again
// Make a menu when pause with option to stop sounds, restart, etc
// Add a timer before start with time of music (na virada)
// Words start fall faster and in final slow down
// Dowload all assets in Menu Scene
// Add special power
// Show a graph with wpm history (add only a button when click open in modal in html)

export class BoardScene extends Phaser.Scene {
  words: Word[] = [];
  worldConfig: Config;
  lastUpdate = Date.now();
  currentWord?: Word;
  score!: Score;
  cursor!: Phaser.GameObjects.Rectangle;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: 'Board', ...(config ?? {}) });

    this.worldConfig = {
      letterSize: 20,
    }
  }

  create() {
    const background = this.add.image(0, 0, assets.bg.GAME_BACKGROUND);
    background.setOrigin(0, 0);
    background.setAlpha(0.1);

    this.sound.play(assets.audio.GAME_MUSIC, { volume: 0.5 });

    this.tweens.add({
      targets: background,
      alpha: 0.5,
      duration: 1000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    })

    this.input.keyboard?.on('keydown', this.keyPress.bind(this));

    new VolumeButton(this, 400, 300);
    new PauseToggleButton(this, 400, 300);

    this.score = new Score(this);
    this.score.create();

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

      this.sound.play(assets.audio.KEYWRONG);
      this.score.miss();

      return;
    }

    if (this.currentWord.word[this.currentWord.indexTyped] === keyCode) {
      this.currentWord.keyNextLetter();
      this.score.hit();
      return;
    }

    this.sound.play(assets.audio.KEYWRONG);
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
      }
    });

  }
}
