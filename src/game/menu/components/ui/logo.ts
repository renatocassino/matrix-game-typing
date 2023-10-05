const style = {
  fontFamily: 'Orbitron',
  fontSize: '50px',
  color: '#ffffff',
  align: 'center',
  shadow: {
    offsetX: 0,
    offsetY: 0,
    color: '#0f0',
    blur: 20,
    stroke: true,
    fill: true,
  },
};

export class Logo extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y, 'Matrix Type.io', style);

    this.setOrigin(0.5, 0.5).setOrigin(0.5, 0).setAlpha(1);

    scene.add.existing(this);
  }
}
