import { assets } from '../../constants/assets';

export class CardModal extends Phaser.GameObjects.Image {
  textureSize: { width: number; height: number };

  constructor(scene: Phaser.Scene, x?: number, y?: number) {
    const boardWidth = scene.sys.game.canvas.width;
    const boardHeight = scene.sys.game.canvas.height;

    super(scene, x ?? boardWidth / 2, y ?? boardHeight / 2, assets.ui.CARD);
    this.setScale(0.8).setOrigin(0.5, 0.5).setInteractive();

    const texture = scene.textures.get(assets.ui.CARD).get(0);
    this.textureSize = {
      width: texture.width * 0.8,
      height: texture.height * 0.8
    };

    scene.add.existing(this);
  }
}
