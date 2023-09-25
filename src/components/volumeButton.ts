export class VolumeButton extends Phaser.GameObjects.Container {
  private volumeButton: Phaser.GameObjects.Image;
  private volumeOn: boolean = true;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    const boardWidth = scene.sys.game.canvas.width;
    const boardHeight = scene.sys.game.canvas.height;

    // Adicione o container à cena
    scene.add.existing(this);

    // Crie o botão de volume inicialmente com o ícone "volume-on"
    this.volumeButton = scene.add.image(boardWidth / 2 - 25, boardHeight / 2 * -1 + 25, 'volume-on').setScale(0.4).setInteractive();
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
