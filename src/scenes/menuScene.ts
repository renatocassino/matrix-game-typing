const today = `000${new Date().getDate()}`.slice(-3);

export class MenuScene extends Phaser.Scene {
  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: 'Menu', ...(config ?? {}) });
  }

  preload() {
    this.load.image('background', `bgs/${today}.jpeg`);
  }

  create() {
    this.cameras.main.fadeIn(300);
    this.addBackground();
    this.addFadeAnimation();
    this.addLogo();
    this.addPlayButton();
  }

  addBackground() {
    const bg = this.textures.get('background').get(0);
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    const widthRatio = boardWidth / bg.width;
    const heightRatio = boardHeight / bg.height;

    const scaleFactor = Math.max(widthRatio, heightRatio);

    const img = this.add.image(boardWidth / 2, boardHeight / 2, 'background');
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
    const boardHeight = this.sys.game.canvas.height;
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
}