export class VolumeButton extends Phaser.GameObjects.Container {
  private volumeButton: Phaser.GameObjects.Image;
  private volumeOn: boolean = true;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    // Adicione o container à cena
    scene.add.existing(this);

    // Crie o botão de volume inicialmente com o ícone "volume-on"
    this.volumeButton = scene.add.image(0, 0, 'volume-on').setInteractive();
    this.add(this.volumeButton);

    // Adicione um evento de clique ao botão
    this.volumeButton.on('pointerdown', this.toggleVolume, this);
  }

  private toggleVolume() {
    if (this.volumeOn) {
      this.volumeButton.setTexture('volume-off');
      this.scene.sound.mute = true;
    } else {
      this.volumeButton.setTexture('volume-on');
      this.scene.sound.mute = false;
    }

    this.volumeOn = !this.volumeOn;
  }
}
