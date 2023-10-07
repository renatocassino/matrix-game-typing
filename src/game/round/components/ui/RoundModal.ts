import { TextButton } from '../../../common/components/ui/textButton';
import { gaEvents } from '../../../common/events';
import { SettingsModal } from '../../../menu/components/ui/settingsModal';
import { RoundScene } from '../../roundScene';

export class RoundModal extends SettingsModal {
  static key = 'RoundModal';

  constructor() {
    super(RoundModal.key);
    this.title = 'Round Paused';
  }

  onCloseModal() {
    super.onCloseModal();
    const roundScene = this.scene.get(RoundScene.key) as RoundScene;
    roundScene.scene.resume();
  }

  create() {
    super.create();

    const cardSize = this.cardModal.textureSize;
    const xCenter = cardSize.width / 2;

    const restartButton = new TextButton(this, xCenter, 350, 'Restart?');
    restartButton.on('pointerdown', () => {
      this.sound.stopAll();

      const roundScene = this.scene.get(RoundScene.key) as RoundScene;
      roundScene.scene.restart();
      this.scene.stop();
      gaEvents.restart();
    });

    const backToMainMenu = new TextButton(this, xCenter, 400, 'Back to Main Menu');
    backToMainMenu.on('pointerdown', () => {
      this.sound.stopAll();
      this.scene.stop(RoundScene.key);
      this.scene.start('MenuScene');
      this.scene.stop();
      gaEvents.backToMainMenu();
    });

    this.container.add([
      restartButton,
      backToMainMenu,
    ]);
  }
}
