import { BackgroundImage } from '../common/components/ui/backgroundImage';
import { IconButton } from '../common/components/ui/iconButton';
import { TextButton } from '../common/components/ui/textButton';
import { assets } from '../common/constants/assets';
import { gaEvents } from '../common/events';
import { RoundScene } from '../round/roundScene';
import { InfoModal } from './components/ui/infoModal';
import { Logo } from './components/ui/logo';
import { SettingsModal } from './components/ui/settingsModal';

export class MenuScene extends Phaser.Scene {
  static key = 'MenuScene';

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: MenuScene.key, ...(config ?? {}) });
  }

  create() {
    this.cameras.main.fadeIn(300);
    new BackgroundImage(this, assets.bg.MENU_BACKGROUND);
    this.addFadeAnimation();
    this.addPlayButton();
    this.addSettings();
    this.addInfo();
    new Logo(this, this.sys.game.canvas.width / 2, 120);
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
      delay: 1500,
      duration: 1000,
      ease: 'Linear',
      repeat: 0,
    });
  }

  addPlayButton() {
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    const { scene, input } = this;
    const button = new TextButton(this, boardWidth / 2, boardHeight / 2, 'New Game');

    button.on('pointerdown', () => {
      input.setDefaultCursor('default');
      scene.start(RoundScene.key);
      gaEvents.play();
    });
  }

  addSettings() {
    const settings = new IconButton(this, this.sys.game.canvas.width - 20, 20, assets.icon.SETTINGS);
    settings.setOrigin(1, 0);

    settings.on('pointerdown', () => {
      this.scene.bringToTop(SettingsModal.key);
      this.scene.launch(SettingsModal.key);
    });
  }

  addInfo() {
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    const infoButton = new IconButton(this, boardWidth - 20, boardHeight - 20, assets.icon.INFO);
    infoButton.setOrigin(1, 1);

    infoButton.on('pointerdown', () => {
      this.scene.bringToTop(InfoModal.key);
      this.scene.launch(InfoModal.key);
    });
  }
}
