export class Overlay extends Phaser.GameObjects.Rectangle {
  constructor(scene: Phaser.Scene) {
    const boardWidth = scene.sys.game.canvas.width;
    const boardHeight = scene.sys.game.canvas.height;
    super(scene, 0, 0, boardWidth, boardHeight, 0x000000, 0.8);
    this.setOrigin(0.5, 0.5);
    this.setInteractive();
  }

  setEventToClose(cb: () => void) {
    this.on('pointerdown', () => {
      cb.apply(this);
    });

    this.scene.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        cb.apply(this);
      }
    });

    return this;
  }
}
