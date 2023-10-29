import { BaseModal } from '../../../common/components/ui/baseModal';

export class InfoModal extends BaseModal {
  static key = 'InfoModal';

  constructor(key?: string) {
    super(key ?? InfoModal.key);
    this.title = 'Credits';
  }

  create() {
    super.create();
    const xCenter = this.cardModal.textureSize.width / 2;

    let currentY = 80;

    const texts = [
      ['Development', 'Renato Cassino'],
      ['Design', 'Renato Cassino'],
      ['Sound Effects', 'Renato Cassino'],
      ['Art', 'Renato Cassino'],
      ['Marketing', 'Renato Cassino'],
      ['Special Thanks', 'Renato Cassino']
    ];

    const components: Phaser.GameObjects.Text[] = [];
    const style = { font: '18px Orbitron', color: '#fff' };

    texts.forEach(([title, value]) => {
      components.push(
        this.add.text(xCenter, currentY, title, style).setOrigin(0.5, 0.5).setAlpha(0.6)
      );

      currentY += 30;
      components.push(
        this.add.text(xCenter, currentY, value, style).setOrigin(0.5, 0.5).setAlpha(1)
      );
      currentY += 40;
    });

    this.container.add([...components]);
  }
}
