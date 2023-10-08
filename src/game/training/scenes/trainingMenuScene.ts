import { BackgroundImage } from '../../common/components/ui/backgroundImage';
import { TextButton } from '../../common/components/ui/textButton';
import { assets } from '../../common/constants/assets';
import { gaEvents } from '../../common/events';
import { levels } from '../levels';
import { TitleMenuScene } from './components/TitleMenuScene';

export class TrainingMenuScene extends Phaser.Scene {
  static key = 'TrainingMenuScene';

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: TrainingMenuScene.key, ...(config ?? {}) });
  }

  create() {
    this.cameras.main.fadeIn(300);
    new BackgroundImage(this, assets.bg.TRAINING);
    this.addFadeAnimation();

    new TitleMenuScene(this, this.sys.game.canvas.width / 2, 60);
    this.addBackButton();
    this.addLevels();
    // this.addPlayButton();
    // this.addSettings();
    // this.addInfo();
    // new LogoText(this, this.sys.game.canvas.width / 2, 290);
    // new LogoImage(this, this.sys.game.canvas.width / 2, 100);
  }

  addLevels() {
    const boardWidth = this.sys.game.canvas.width;

    const { scene, input } = this;

    // TODO - Make a pagination
    levels.forEach((level, i) => {
      const button = new TextButton(this, boardWidth / 2, 120 + 30 * i, level.title, { fontSize: '18px' });
      button.on('pointerdown', () => {
        input.setDefaultCursor('default');
        scene.start('MenuScene');
        gaEvents.backToMainMenu();
      });
    });
  }

  addBackButton() {
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    const { scene, input } = this;
    const button = new TextButton(this, boardWidth / 2, boardHeight - 60, 'Back to main menu');

    button.on('pointerdown', () => {
      input.setDefaultCursor('default');
      scene.start('MenuScene');
      gaEvents.backToMainMenu();
    });
  }

  addFadeAnimation() {
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    const rectangle = this
      .add
      .rectangle(0, 0, boardWidth, boardHeight, 0x000000, 1)
      .setOrigin(0, 0)
      .setAlpha(0);

    this.tweens.add({
      targets: rectangle,
      alpha: 0.5,
      delay: 0,
      duration: 1000,
      ease: 'Linear',
      repeat: 0,
    });
  }
}
