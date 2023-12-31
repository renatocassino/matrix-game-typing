import { assets } from '../../common/constants/assets';
import { gameEvents } from '../../common/constants/events';

export class PauseToggleButton extends Phaser.GameObjects.Container {
  private pauseToggle: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.pauseToggle = scene.add.image(0, 0, assets.icon.PAUSE).setInteractive();
    this.add(this.pauseToggle);

    this.pauseToggle.on('pointerdown', this.togglePause, this);
    this.pauseToggle.on('pointerover', () => {
      scene.input.setDefaultCursor('pointer');
    });
    this.pauseToggle.on('pointerout', () => {
      scene.input.setDefaultCursor('default');
    });

    scene.input.keyboard?.on('keydown', this.keyPress.bind(this));
    scene.add.existing(this);
  }

  keyPress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.togglePause();
    }
  }

  private togglePause() {
    if (this.scene.game.isPaused) {
      this.scene.events.emit(gameEvents.RESUME);
    } else {
      this.scene.events.emit(gameEvents.PAUSE);
    }
  }
}
