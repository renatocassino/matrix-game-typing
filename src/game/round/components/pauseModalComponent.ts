import { assets } from '../../common/constants/assets';
import { gameEvents } from '../../common/constants/events';
import { MenuScene } from '../../menu/menuScene';
import { RoundScene } from '../roundScene';

export class PauseModalComponent extends Phaser.GameObjects.Container {
  constructor(readonly scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.visible = false;

    const self = this;

    const boardWidth = this.scene.sys.game.canvas.width;
    const boardHeight = this.scene.sys.game.canvas.height;

    const wrapBg = scene
      .add
      .rectangle(0, 0, boardWidth, boardHeight, 0x000000)
      .setOrigin(0.5, 0.5)
      .setScale(1)
      .setAlpha(0.7)
      .setInteractive()
      .on('pointerdown', () => {
        (self.scene as RoundScene).emitter.emit(gameEvents.RESUME);
      });
    this.add(wrapBg);

    const bgMenu = scene
      .add
      .image(0, 0, assets.ui.CARD)
      .setOrigin(0.5, 0.5)
      .setScale(1)
      .setAlpha(0.8)
      .setRotation(Phaser.Math.DegToRad(90))
      .setInteractive()
      .on('pointerdown', ({ event }: { event: MouseEvent }) => {
        event.stopPropagation();
      });
    this.add(bgMenu);

    const title = scene.add.text(0, 0 - wrapBg.height / 2 + 40, 'PAUSED', {
      fontFamily: 'Orbitron',
      fontSize: '30px',
      color: '#ffffff',
    }).setOrigin(0.5, 0);
    this.add(title);

    const closeButton = scene
      .add
      .image(0, 0, assets.icon.CLOSE)
      .setOrigin(0.5, 0.5)
      .setX(bgMenu.height / 2 - 30)
      .setY(0 - bgMenu.width / 2 + 40)
      .setInteractive()
      .on('pointerdown', () => {
        (self.scene as RoundScene).emitter.emit(gameEvents.RESUME);
      })
      .on('pointerover', () => {
        closeButton.setAlpha(0.8);
        scene.input.setDefaultCursor('pointer');
      })
      .on('pointerout', () => {
        closeButton.setAlpha(1);
        scene.input.setDefaultCursor('default');
      });
    this.add(closeButton);

    const backToMenuText = scene
      .add
      .text(0, 0, 'Back to Menu', { fontFamily: 'Orbitron', fontSize: '18px', color: '#ffffff' }).setOrigin(0.5, 0.5).setAlpha(0.8).setInteractive()
      .on('pointerover', () => {
        backToMenuText.setAlpha(1);
        scene.input.setDefaultCursor('pointer');
      })
      .on('pointerout', () => {
        backToMenuText.setAlpha(0.8);
        scene.input.setDefaultCursor('default');
      })
      .on('pointerdown', () => {
        (self.scene as RoundScene).emitter.emit(gameEvents.RESUME);
        self.scene.sound.stopAll();
        scene.scene.start(MenuScene.key);
      });

    this.add(backToMenuText);

    this.setDepth(100);
    scene.add.existing(this);
  }
}
