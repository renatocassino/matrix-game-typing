import type { assets } from '../../constants/assets';

export class IconButton extends Phaser.GameObjects.Image {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    icon: (typeof assets.icon)[keyof typeof assets.icon]
  ) {
    super(scene, x, y, icon);

    const startColor = Phaser.Display.Color.ValueToColor(0xffffff);
    const endColor = Phaser.Display.Color.ValueToColor(0x00ff00);

    this.setOrigin(0.5, 0.5)
      .setInteractive()
      .setAlpha(1)
      .on('pointerover', () => {
        scene.input.setDefaultCursor('pointer');
        scene.tweens.add({
          targets: this,
          duration: 100,
          alpha: 0.8,
          shadow: {
            offsetX: 0,
            offsetY: 0,
            color: '#00FF00',
            blur: 2,
            stroke: true,
            fill: true
          }
        });

        scene.tweens.addCounter({
          from: 0,
          to: 100,
          duration: 100,
          onUpdate: (tween) => {
            const progress = tween.getValue();
            const newColor = Phaser.Display.Color.Interpolate.ColorWithColor(
              startColor,
              endColor,
              100,
              progress
            );
            this.setTint(Phaser.Display.Color.GetColor(newColor.r, newColor.g, newColor.b));
          }
        });
      })
      .on('pointerout', () => {
        scene.input.setDefaultCursor('default');
        scene.tweens.add({
          targets: this,
          duration: 100,
          alpha: 1,
          color: '#FFF',
          shadow: {
            offsetX: 0,
            offsetY: 0,
            color: '#FFF',
            blur: 0,
            stroke: true,
            fill: true
          }
        });

        scene.tweens.addCounter({
          from: 0,
          to: 100,
          duration: 100,
          onUpdate: (tween) => {
            const progress = tween.getValue();
            const newColor = Phaser.Display.Color.Interpolate.ColorWithColor(
              endColor,
              startColor,
              100,
              progress
            );
            this.setTint(Phaser.Display.Color.GetColor(newColor.r, newColor.g, newColor.b));
          }
        });
      });

    scene.add.existing(this);
  }
}
