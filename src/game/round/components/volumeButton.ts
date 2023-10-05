import { assets } from '../../common/constants/assets';

export class VolumeButton extends Phaser.GameObjects.Container {
  private volumeButton: Phaser.GameObjects.Image;

  private volumeOn: boolean = true;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // Crie o botão de volume inicialmente com o ícone "volume-on"
    this.volumeButton = scene.add.image(0, 0, assets.icon.VOLUME_ON).setInteractive();
    this.add(this.volumeButton);

    this.volumeButton.on('pointerdown', this.toggleVolume, this);

    this.volumeButton.on('pointerover', () => {
      scene.input.setDefaultCursor('pointer');
    });
    this.volumeButton.on('pointerout', () => {
      scene.input.setDefaultCursor('default');
    });

    scene.add.existing(this);
  }

  private toggleVolume() {
    if (this.volumeOn) {
      this.volumeButton.setTexture(assets.icon.VOLUME_OFF);
      this.scene.sound.mute = true;
    } else {
      this.volumeButton.setTexture(assets.icon.VOLUME_ON);
      this.scene.sound.mute = false;
    }

    this.volumeOn = !this.volumeOn;
  }
}
