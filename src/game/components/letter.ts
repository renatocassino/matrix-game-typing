import { LetterStatus } from '../../types';
import { BoardScene } from '../scenes/boardScene';
import { Word } from './word';

export class Letter extends Phaser.GameObjects.Container {
  text: Phaser.GameObjects.Text;
  status: LetterStatus;

  constructor(
    private readonly board: BoardScene,
    private readonly letter: string,
    private readonly index: number,
    private readonly word: Word,
  ) {
    super(board, 0, 0);
    const size = this.board.worldConfig.letterSize;
    this.text = this.board.add.text(
      0,
      this.index * size,
      this.letter,
      { color: '#0F0', fontSize: `${size}px` },
    ).setOrigin(0.5, 0);

    this.status = LetterStatus.Initial;

    this.add(this.text);
    board.add.existing(this);
  }

  update() {
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
  }
}