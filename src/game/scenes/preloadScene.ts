import { assets } from "../constants/assets";
import { MenuScene } from "./menuScene";

export class PreloadScene extends Phaser.Scene {
  static key = 'PreloadScene';
  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: PreloadScene.key, ...(config ?? {}) });
  }

  preload() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const progressBoxWidth = 320;
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x008800, 0.8).fillRect(width / 2 - progressBoxWidth / 2, 270, progressBoxWidth, 50);

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 140,
      text: 'Loading...',
      style: {
        font: '20px Orbitron',
        color: '#ffffff'
      }
    }).setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px Orbitron',
        color: '#ffffff'
      }
    }).setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px Orbitron',
        color: '#ffffff'
      }
    }).setOrigin(0.5, 0.5);

    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - progressBoxWidth / 2 + 10, 280, (progressBoxWidth - 20) * value, 30);
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

    const today = `000${new Date().getDate()}`.slice(-3);
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

    this.load.atlas('flares', 'sprites/flares.png', 'sprites/flares.json');
    this.load.image(assets.ui.CARD, 'card.png');

    const scoreId = `000${Math.floor((new Date().getDate() + 20) % 31) + 1}`.slice(-3);

    this.load.image(assets.bg.SCORE, `bgs/${scoreId}.jpeg`);
    this.load.image(assets.ui.CARD, 'card.png');
  }

  create() {
    this.game.scene.start(MenuScene.key);
  }
}