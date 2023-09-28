import { BoardScene } from './game/scenes/boardScene';
import { LetterStatus } from './types';
import { Word } from './word';

export class Letter {
  text: Phaser.GameObjects.Text;
  status: LetterStatus;

  constructor(
    private readonly board: BoardScene,
    private readonly letter: string,
    private readonly index: number,
    private readonly x: number,
    private readonly word: Word,
  ) {
    const size = this.board.worldConfig.letterSize;
    this.text = this.board.add.text(
      this.x * size,
      this.index * size,
      this.letter,
      { color: '#0F0', fontSize: `${size}px` },
    );

    this.status = LetterStatus.Initial;
  }

  created() {
  }

  update(y: number) {
    if (this.status === LetterStatus.Typed) {
      this.text.setColor('#00FF00');
      const alpha = Math.max(0.1, 1 - 0.25 * (this.word.indexTyped - this.index));
      this.text.setAlpha(alpha);
      this.text.setShadow(0, 0, '#fff', 0);
    } else if (this.status === LetterStatus.Current) {
      this.text.setColor('#fff');
      this.text.setShadow(0, 0, '#fff', 4);
      this.text.setAlpha(1);
    } else {
      this.text.setColor('#00FF00');
      this.text.setShadow(0, 0, '#fff', 0);
      this.text.setAlpha(0.9);
    }

    const size = this.board.worldConfig.letterSize;
    this.text.y = y + this.index * size;
  }
}