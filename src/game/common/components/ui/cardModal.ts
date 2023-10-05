import { assets } from '../../constants/assets';

export class CardModal extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    const boardWidth = scene.sys.game.canvas.width;
    const boardHeight = scene.sys.game.canvas.height;

    super(scene, x ?? boardWidth / 2, y ?? boardHeight / 2, assets.ui.CARD);
    this
      .setScale(0.8)
      .setOrigin(0.5, 0.5)
      .setInteractive();

    scene.add.existing(this);
  }
}
