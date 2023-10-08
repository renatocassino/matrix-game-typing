import { assets } from '../../../common/constants/assets';

export class LogoImage extends Phaser.GameObjects.Image {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, assets.images.LOGO);
    this.setOrigin(0.5, 0.5).setOrigin(0.5, 0).setAlpha(0.8).setScale(0.18);
    scene.add.existing(this);
  }
}
