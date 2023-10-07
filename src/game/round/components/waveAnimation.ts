import { Scene } from 'phaser';

export class WaveAnimation extends Phaser.GameObjects.Container {
  currentWave: number;

  status: 'playing' | 'ended' = 'ended';

  waveText: Phaser.GameObjects.Text;

  wrapBg: Phaser.GameObjects.Rectangle;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    this.currentWave = 0;
    this.visible = false;
    this.setDepth(100);

    const boardWidth = this.scene.sys.game.canvas.width;
    const boardHeight = this.scene.sys.game.canvas.height;

    this.wrapBg = scene
      .add
      .rectangle(0, 0, boardWidth, boardHeight, 0x000000)
      .setOrigin(0.5, 0.5)
      .setScale(1)
      .setAlpha(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.visible = false;
        this.status = 'ended';
      });
    this.add(this.wrapBg);

    this.waveText = scene.add.text(0 - boardWidth / 4, 0, 'WAVE 1', {
      font: 'bold 40px Orbitron',
      color: '#00FF00',
      fontStyle: 'underline',
    }).setAlpha(0).setOrigin(0.5, 0.5);
    this.add(this.waveText);

    scene.add.existing(this);
  }

  increaseWave() {
    this.currentWave += 1;
  }

  setWave(wave: number) {
    this.currentWave = wave;
  }

  play(cb: () => void) {
    this.visible = true;

    this.waveText.setText(`WAVE ${this.currentWave}`);

    this.scene.tweens.add({
      targets: this.wrapBg,
      alpha: 0.7,
      duration: 200,
    });

    this.scene.tweens.add({
      targets: this.waveText,
      alpha: 1,
      y: '-=130',
      duration: 2000,
      animation: 'easeInOut',
    }).on('complete', () => {
      this.scene.tweens.add({
        targets: [this.wrapBg, this.waveText],
        alpha: 0,
        delay: 1200,
        duration: 200,
        onComplete: () => {
          this.visible = false;
          this.waveText.setY(0);
          cb();
        },
      });
    });
  }
}
