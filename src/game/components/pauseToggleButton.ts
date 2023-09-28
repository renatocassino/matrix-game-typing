import { assets } from "../constants/assets";

export class PauseToggleButton extends Phaser.GameObjects.Container {
  private pauseToggle: Phaser.GameObjects.Image;
  private paused: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.pauseToggle = scene.add.image(0, 0, assets.icon.PAUSE).setInteractive();
    this.add(this.pauseToggle);

    this.pauseToggle.on('pointerdown', this.togglePause, this);
    this.pauseToggle.on('pointerover', function () {
      scene.input.setDefaultCursor('pointer');
    });
    this.pauseToggle.on('pointerout', function () {
      scene.input.setDefaultCursor('default');
    });

    scene.add.existing(this);
  }

  private togglePause() {
    if (this.paused) {
      this.pauseToggle.setTexture(assets.icon.PLAY);
      this.scene.scene.pause("default");
    } else {
      this.pauseToggle.setTexture(assets.icon.PAUSE);
      this.scene.scene.resume("default");
    }

    this.paused = !this.paused;
  }
}
