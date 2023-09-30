import { SettingsModalComponent } from "../components/settingsModalComponent";
import { assets } from "../constants/assets";

const today = `000${new Date().getDate()}`.slice(-3);

// TODO - create a preload scene
export class MenuScene extends Phaser.Scene {
  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: 'Menu', ...(config ?? {}) });
  }

  addPreloader() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x008800, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        color: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        color: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        color: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
      percentText.setText(Math.floor(value * 100) + '%');
    });

    this.load.on('fileprogress', (file: { key: string }) => {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }

  preload() {
    this.addPreloader();

    this.load.image(assets.bg.MENU_BACKGROUND, `bgs/${today}.jpeg`);
    this.load.image(assets.bg.GAME_BACKGROUND, 'bgs/bg-game-02.jpg');

    this.load.audio(assets.audio.KEYPRESS, 'fx/keypress.wav');
    this.load.audio(assets.audio.KEYWRONG, 'fx/keywrong.mp3');
    this.load.audio(assets.audio.EXPLOSION_SMALL, 'fx/explosion-small.wav');
    this.load.audio(assets.audio.GAME_MUSIC, 'fx/board-music.mp3');

    this.load.svg(assets.icon.VOLUME_ON, 'icons/volume-on.svg');
    this.load.svg(assets.icon.VOLUME_OFF, 'icons/volume-off.svg');
    this.load.svg(assets.icon.PLAY, 'icons/play.svg');
    this.load.svg(assets.icon.PAUSE, 'icons/pause.svg');
    this.load.svg(assets.icon.SETTINGS, 'icons/settings.svg');
    this.load.svg(assets.icon.CLOSE, 'icons/close.svg');
    this.load.svg(assets.icon.PLUS, 'icons/plus.svg');
    this.load.svg(assets.icon.MINUS, 'icons/minus.svg');

    this.load.svg('n0', '0.svg');
    this.load.svg('n1', '1.svg');

    // this.load.atlas('flares', 'sprites/flares.png', 'sprites/flares.json');
    this.load.image(assets.ui.CARD, 'card.png');

    const scoreId = `000${Math.floor((new Date().getDate() + 20) % 31) + 1}`.slice(-3);

    this.load.image('background-score', `bgs/${scoreId}.jpeg`);
    this.load.image(assets.ui.CARD, 'card.png');
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

    const rectangle = this.add.rectangle(0, 0, boardWidth, boardHeight, 0x000000, 1).setOrigin(0, 0).setAlpha(0);

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
    this.add.text(boardWidth / 2, 60, 'Type Matrix\nWar', {
      fontFamily: 'Arial',
      fontSize: '80px',
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

    const scene = this.scene;
    const button = this.add.text(boardWidth / 2, boardHeight / 2 + 80, 'New Game', {
      fontFamily: 'Arial',
      fontSize: '22px',
      color: '#ffffff',
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: '#fff',
        blur: 0,
        stroke: true,
        fill: true,
      },
    }).setOrigin(0.5, 0.5).setInteractive().setAlpha(1);

    button.on('pointerover', function () {
      self.input.setDefaultCursor('pointer');
      button.setAlpha(0.8);
      button.setColor('#00FF00');
      button.setShadow(0, 0, '#00FF00', 2, true, true);
    });

    button.on('pointerout', function () {
      self.input.setDefaultCursor('default');
      button.setColor('#FFF');
      button.setAlpha(1);
      button.setShadow(0, 0, '#FFF', 0, true, true);
    });

    button.on('pointerdown', function () {
      self.input.setDefaultCursor('default');
      scene.start('Board');
    }, this);
  }

  addSettings() {
    const self = this;
    const settings = this.add.image(this.sys.game.canvas.width - 20, 20, assets.icon.SETTINGS).setOrigin(1, 0).setInteractive().setScale(1);

    const settingComponent = new SettingsModalComponent(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2);


    settings.on('pointerdown', () => {
      if (settingComponent.visible) {
        settingComponent.close();
      } else {
        settingComponent.open();
      }
    });

    settings.on('pointerover', function () {
      settings.setAlpha(0.8);
      self.input.setDefaultCursor('pointer');
    }, this);

    settings.on('pointerout', function () {
      settings.setAlpha(1);
      self.input.setDefaultCursor('default');
    }, this);

  }
}