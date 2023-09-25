import { Board } from "./board";
import { Letter } from "./letter";
import { LetterStatus, WordStatus } from "./types";

export class Word {
  letters: Letter[] = [];
  status: WordStatus;
  y: number;
  indexTyped = -1;

  constructor(private readonly board: Board, readonly word: string, readonly x: number) {
    this.status = 'inactive';

    this.y = board.worldConfig.letterSize * word.length * -1;

    this.bootstrap();
  }

  bootstrap() {
    this.word.split('').forEach((letter, index) => {
      const currentLetter = new Letter(this.board, letter, index, this.x, this);
      currentLetter.created();
      this.letters.push(currentLetter);
    });
  }

  update() {
    this.y += 1;
    this.letters.forEach(letter => letter.update(this.y));
  }

  keyNextLetter() {
    if (this.indexTyped === -1) {
      this.indexTyped = 0;
    }
    this.letters[this.indexTyped].status = LetterStatus.Typed;
    this.indexTyped++;

    if (this.indexTyped === this.word.length) {
      this.status = 'completed';
      return;
    }

    this.letters[this.indexTyped].status = LetterStatus.Current;

    const size = this.board.worldConfig.letterSize;
    this.board.add.particles(this.x * size, this.y + (this.indexTyped * this.board.worldConfig.letterSize), 'red', {
      speed: 100,
      scale: { start: 1, end: 0 },
      duration: 200,
      blendMode: 'ADD',
      alpha: 0.2,
    });
  }

  shouldRemove() {
    if (this.status === 'completed') {
      return true;
    }
    const boardHeight = this.board.sys.game.canvas.height;
    const size = this.board.worldConfig.letterSize;
    const wordHeight = this.word.length * size;

    return (this.y > boardHeight + wordHeight);
  }

  remove() {
    this.letters.forEach(letter => letter.text.destroy());
    // const size = this.board.worldConfig.letterSize;
    // this.board.add.particles(this.x * size, this.y + (this.letters.length * this.board.worldConfig.letterSize), 'red', {
    //   speed: 100,
    //   scale: { start: 1, end: 0 },
    //   duration: 200,
    //   blendMode: 'ADD',
    // });
  }
}
