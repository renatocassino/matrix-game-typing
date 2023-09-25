export class PauseToggleButton extends Phaser.GameObjects.Container {
  private pauseToggle: Phaser.GameObjects.Image;
  private paused: boolean = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    const boardWidth = scene.sys.game.canvas.width;
    const boardHeight = scene.sys.game.canvas.height;

    // Adicione o container à cena
    scene.add.existing(this);

    // Crie o botão de volume inicialmente com o ícone "volume-on"
    this.pauseToggle = scene.add.image(boardWidth / 2 - 25, boardHeight / 2 * -1 + 25, 'pause').setInteractive();
    this.add(this.pauseToggle);

    // Adicione um evento de clique ao botão
    this.pauseToggle.on('pointerdown', this.togglePause, this);

    this.pauseToggle.on('pointerover', function () {
      scene.input.setDefaultCursor('pointer');
    });
    this.pauseToggle.on('pointerout', function () {
      scene.input.setDefaultCursor('default');
    });
  }

  private togglePause() {
    if (this.paused) {
      this.pauseToggle.setTexture('play');
      this.scene.scene.pause("default");
    } else {
      this.pauseToggle.setTexture('pause');
      this.scene.scene.resume("default");
    }

    this.paused = !this.paused;
  }
}
