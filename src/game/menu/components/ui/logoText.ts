const style = {
  fontFamily: 'Orbitron',
  fontSize: '45px',
  color: '#ffffff',
  align: 'center',
  shadow: {
    offsetX: 0,
    offsetY: 0,
    color: '#0f0',
    blur: 20,
    stroke: true,
    fill: true
  }
};

export class LogoText extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'Matrix\nTyper.com', style);

    this.setOrigin(0.5, 0.5).setAlpha(1);

    scene.add.existing(this);
  }
}
