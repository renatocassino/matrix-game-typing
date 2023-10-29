import type { assets } from '../../constants/assets';

export class BackgroundImage extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, backgroundName: (typeof assets.bg)[keyof typeof assets.bg]) {
    const bg = scene.textures.get(backgroundName).get(0);
    const boardWidth = scene.sys.game.canvas.width;
    const boardHeight = scene.sys.game.canvas.height;

    const widthRatio = boardWidth / bg.width;
    const heightRatio = boardHeight / bg.height;

    const scaleFactor = Math.max(widthRatio, heightRatio);
    super(scene, boardWidth / 2, boardHeight / 2, backgroundName);
    this.setScale(scaleFactor).setOrigin(0.5, 0.5);

    scene.add.existing(this);
  }
}
