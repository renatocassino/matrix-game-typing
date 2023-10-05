export class VirtualKeyboard extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, readonly x: number, readonly y: number) {
    super(scene, x, y);

    const boardWidth = scene.sys.game.canvas.width;

    const bg = scene.add.rectangle(0, 0, boardWidth, 150, 0x007700, 0.5).setOrigin(0, 0);
    this.add(bg);

    this.buildKeyboard();

    this.scene.add.existing(this);
  }

  buildKeyboard() {
    const self = this;
    const firstLine = 'QWERTYUIOP';
    const secondLine = 'ASDFGHJKL';
    const thirdLine = 'ZXCVBNM';
    const letterSpacing = 5;

    const boardWidth = this.scene.sys.game.canvas.width;

    const totalSpacing = (firstLine.length - 1) * letterSpacing;
    const availableWidth = boardWidth - totalSpacing;
    const letterSize = availableWidth / firstLine.length;

    const addKeyCommand = (button: Phaser.GameObjects.Rectangle, key: string) => {
      button.setInteractive();
      button.on('pointerdown', () => {
        self.scene.input.keyboard?.emit('keydown', { key: key.toLowerCase() });
      });
    };

    let xPosition = letterSize / 2;
    const font = '22px Orbitron';

    for (let i = 0; i < firstLine.length; i += 1) {
      const area = this
        .scene
        .add
        .rectangle(xPosition, 30, letterSize, 40, 0x000000, 0.5)
        .setOrigin(0.5, 0.5);
      const button = self.scene.add.text(xPosition, 30, firstLine[i], {
        font, color: '#ffffff',
      }).setOrigin(0.5, 0.5);
      addKeyCommand(area, firstLine[i]);
      this.add(area);
      this.add(button);
      xPosition += letterSize + letterSpacing;
    }

    xPosition = letterSize;
    for (let i = 0; i < secondLine.length; i += 1) {
      const area = this
        .scene
        .add
        .rectangle(xPosition, 75, letterSize, 40, 0x000000, 0.5)
        .setOrigin(0.5, 0.5);
      const button = self.scene.add.text(xPosition, 75, secondLine[i], {
        font, color: '#ffffff',
      }).setOrigin(0.5, 0.5);
      addKeyCommand(area, secondLine[i]);
      this.add(area);
      this.add(button);
      xPosition += letterSize + letterSpacing;
    }

    xPosition = letterSize * 2;
    for (let i = 0; i < thirdLine.length; i += 1) {
      const area = this
        .scene
        .add
        .rectangle(xPosition, 120, letterSize, 40, 0x000000, 0.5)
        .setOrigin(0.5, 0.5);
      const button = self.scene.add.text(xPosition, 120, thirdLine[i], {
        font, color: '#ffffff',
      }).setOrigin(0.5, 0.5);
      addKeyCommand(area, thirdLine[i]);
      this.add(area);
      this.add(button);
      xPosition += letterSize + letterSpacing;
    }
  }
}
