import { assets } from '../../constants/assets';
import { CardModal } from './cardModal';
import { IconButton } from './iconButton';
import { Overlay } from './overlay';

export class BaseModal extends Phaser.Scene {
  static key = 'BaseModal';

  title: string = '';

  cardModal!: CardModal;

  closeModal!: IconButton;

  container!: Phaser.GameObjects.Container;

  constructor(key: string) {
    super({ key: key ?? BaseModal.key });
  }

  // eslint-disable-next-line class-methods-use-this
  onCloseModal() {}

  create() {
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    const overlay = new Overlay(this);
    const cardModal = new CardModal(this, 0, 0).setOrigin(0, 0);
    cardModal.on('pointerdown', ({ event }: { event: MouseEvent }) => {
      event.stopPropagation();
    });

    const cardSize = cardModal.textureSize;

    const closeButton = new IconButton(
      this,
      cardSize.width - 30,
      30,
      assets.icon.CLOSE,
    ).on('pointerdown', () => {
      this.scene.stop();
    });

    const xCenter = cardSize.width / 2;

    const container = this.add.container(cardSize.width, cardSize.height)
      .setPosition(boardWidth / 2 - cardSize.width / 2, boardHeight / 2 - cardSize.height / 2);

    const title = this.add.text(
      xCenter,
      35,
      this.title ?? '',
      { font: '18px Orbitron', color: '#fff' },
    )
      .setOrigin(0.5, 0.5);

    const disclaimer = this
      .add
      .text(xCenter, cardSize.height - 40, 'Press ESC to close', { font: '14px Orbitron', color: '#fff' })
      .setOrigin(0.5, 0.5);

    container.add([cardModal, title, disclaimer, closeButton]);

    this.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.onCloseModal();
        this.scene.stop();
      }
    });
    overlay.on('pointerdown', () => {
      this.onCloseModal();
      this.scene.stop();
    });

    this.cardModal = cardModal;
    this.closeModal = closeButton;
    this.container = container;
  }
}
