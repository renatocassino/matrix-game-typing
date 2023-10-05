import { TextButton } from '../common/components/ui/textButton';
import { assets } from '../common/constants/assets';
import { RoundScene } from '../round/roundScene';
import { SettingsModalComponent } from './components/ui/settingsModalComponent';

export class MenuScene extends Phaser.Scene {
  static key = 'MenuScene';

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: MenuScene.key, ...(config ?? {}) });
  }

  create() {
    this.cameras.main.fadeIn(300);
    this.addBackground();
    this.addFadeAnimation();
    this.addLogo();
    this.addPlayButton();
    this.addSettings();
  }

  addBackground() {
    const bg = this.textures.get(assets.bg.MENU_BACKGROUND).get(0);
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    const widthRatio = boardWidth / bg.width;
    const heightRatio = boardHeight / bg.height;

    const scaleFactor = Math.max(widthRatio, heightRatio);

    const img = this.add.image(boardWidth / 2, boardHeight / 2, assets.bg.MENU_BACKGROUND);
    img.setScale(scaleFactor);
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

  addLogo() {
    // The logo is just a text
    const boardWidth = this.sys.game.canvas.width;
    // const boardHeight = this.sys.game.canvas.height;
    this.add.text(boardWidth / 2, 120, 'Matrix Type.io', {
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
    }).setOrigin(0.5, 0).setAlpha(1);
  }

  addPlayButton() {
    const self = this;
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    const { scene } = this;
    const button = new TextButton(this, boardWidth / 2, boardHeight / 2, 'New Game');

    button.on('pointerdown', () => {
      self.input.setDefaultCursor('default');
      scene.start(RoundScene.key);
    }, this);
  }

  addSettings() {
    const self = this;
    const settings = this
      .add
      .image(this.sys.game.canvas.width - 20, 20, assets.icon.SETTINGS)
      .setOrigin(1, 0)
      .setInteractive()
      .setScale(1);

    const settingComponent = new SettingsModalComponent(
      this,
      this.sys.game.canvas.width / 2,
      this.sys.game.canvas.height / 2,
    );

    settings.on('pointerdown', () => {
      if (settingComponent.visible) {
        settingComponent.close();
      } else {
        settingComponent.open();
      }
    });

    settings.on('pointerover', () => {
      settings.setAlpha(0.8);
      self.input.setDefaultCursor('pointer');
    }, this);

    settings.on('pointerout', () => {
      settings.setAlpha(1);
      self.input.setDefaultCursor('default');
    }, this);
  }
}
