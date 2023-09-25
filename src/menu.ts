const today = `000${new Date().getDate()}`.slice(-3);

export class Menu extends Phaser.Scene {
  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: 'Menu', ...(config ?? {}) });
  }

  preload() {
    this.load.image('background', `bgs/${today}.jpeg`);
  }

  create() {
    const bg = this.textures.get('background').get(0);
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;

    const { width: imgWidth, height: imgHeight } = bg;

    // Calcule as proporções (razões) entre a largura e a altura da cena e da imagem
    const widthRatio = boardWidth / imgWidth;
    const heightRatio = boardHeight / imgHeight;

    // Escolha a maior proporção para dimensionar a imagem
    const scaleFactor = Math.max(widthRatio, heightRatio);

    const img = this.add.image(boardWidth / 2, boardHeight / 2, 'background');
    img.setScale(scaleFactor);

    this.cameras.main.fadeIn(300);
    this.add.rectangle(0, 0, boardWidth, boardHeight, 0x000000, 0.2).setOrigin(0, 0);

    const scene = this.scene;
    const button = this.add.rectangle(boardWidth / 2, boardHeight / 2, 200, 50, 0x00ff00, 0.5);
    button.setInteractive();
    button.on('pointerdown', function () {
      scene.start('Board');
    }, this);
  }

  update() {

  }
}