import { LetterStatus } from '../../../types';
import { WordComponent } from './wordComponent';

export class LetterComponent extends Phaser.GameObjects.Container {
  text: Phaser.GameObjects.Text;

  status: LetterStatus;

  constructor(
    readonly scene: Phaser.Scene,
    private readonly letter: string,
    private readonly index: number,
    private readonly word: WordComponent,
    letterSize: number,
  ) {
    super(scene, 0, 0);
    this.text = this.scene.add.text(
      0,
      this.index * letterSize,
      this.letter.toUpperCase(),
      { color: '#0F0', fontFamily: '\'Roboto Slab\'', fontSize: `${letterSize - 3}px` },
    ).setOrigin(0.5, 0);

    this.status = LetterStatus.Initial;

    this.add(this.text);
    scene.add.existing(this);
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
