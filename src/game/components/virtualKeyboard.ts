
export class VirtualKeyboard extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, readonly x: number, readonly y: number) {
    super(scene, x, y);

    const boardWidth = scene.sys.game.canvas.width;

    const bg = scene.add.rectangle(0, 0, boardWidth, 130, 0x007700, 0.5).setOrigin(0, 0);
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

    const addKeyCommand = (button: Phaser.GameObjects.Text) => {
      button.setInteractive();
      button.on('pointerdown', () => {
        console.log('Key press :)', button.text);
        self.scene.input.keyboard?.emit('keydown', { key: button.text.toLowerCase() });
      });
    };

    let xPosition = letterSize / 2;

    for (let i = 0; i < firstLine.length; i++) {
      const button = self.scene.add.text(xPosition, 25, firstLine[i], {
        fontSize: `24px`, color: '#ffffff',
      }).setOrigin(0.5, 0.5);
      addKeyCommand(button);
      this.add(button);
      xPosition += letterSize + letterSpacing;
    }

    xPosition = letterSize;
    for (let i = 0; i < secondLine.length; i++) {
      const button = self.scene.add.text(xPosition, 65, secondLine[i], {
        fontSize: `24px`, color: '#ffffff',
      }).setOrigin(0.5, 0.5);
      addKeyCommand(button);
      this.add(button);
      xPosition += letterSize + letterSpacing;
    }

    xPosition = letterSize * 2;
    for (let i = 0; i < thirdLine.length; i++) {
      const button = self.scene.add.text(xPosition, 105, thirdLine[i], {
        fontSize: `24px`, color: '#ffffff',
      }).setOrigin(0.5, 0.5);
      addKeyCommand(button);
      this.add(button);
      xPosition += letterSize + letterSpacing;
    }
  }
}