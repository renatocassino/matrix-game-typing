import { asPercentage } from '../../../../utils/string';
import { BaseModal } from '../../../common/components/ui/baseModal';
import { IconButton } from '../../../common/components/ui/iconButton';
import { assets } from '../../../common/constants/assets';
import { Settings } from '../../../common/settings';

export class SettingsModal extends BaseModal {
  static key = 'SettingsModal';

  constructor(key?: string) {
    super(key ?? SettingsModal.key);
    this.title = 'Settings';
  }

  create() {
    super.create();
    const settings = this.game.registry.get('settings') as Settings;

    const xCenter = this.cardModal.textureSize.width / 2;

    const marginButton = 60;

    const musicText = this
      .add
      .text(xCenter, 120, 'Music Volume', { font: '18px Orbitron', color: '#fff' })
      .setOrigin(0.5, 0.5)
      .setAlpha(0.6);

    const musicValue = this.add.text(xCenter, 150, asPercentage(settings.getConfig('musicVolume')), { font: '18px Orbitron', color: '#fff' }).setOrigin(0.5, 0.5);

    const increaseVolume = new IconButton(this, xCenter + marginButton, 150, assets.icon.PLUS);
    increaseVolume.on('pointerdown', () => {
      const volume = settings.getConfig('musicVolume');
      const newVolume = (Math.floor(volume * 10) + 1) / 10;
      settings.setConfig('musicVolume', Math.min(1, newVolume));
      musicValue.setText(asPercentage(settings.getConfig('musicVolume')));
    });

    const decreaseVolume = new IconButton(this, xCenter - marginButton, 150, assets.icon.MINUS);
    decreaseVolume.on('pointerdown', () => {
      const volume = settings.getConfig('musicVolume');
      const newVolume = (Math.floor(volume * 10) - 1) / 10;
      settings.setConfig('musicVolume', Math.max(0, newVolume));
      musicValue.setText(asPercentage(settings.getConfig('musicVolume')));
    });

    const fxText = this
      .add
      .text(xCenter, 220, 'FX Volume', { font: '18px Orbitron', color: '#fff' })
      .setOrigin(0.5, 0.5)
      .setAlpha(0.6);

    const fxValue = this
      .add
      .text(xCenter, 250, asPercentage(settings.getConfig('fxVolume')), { font: '18px Orbitron', color: '#fff' })
      .setOrigin(0.5, 0.5);

    const increateFxVolume = new IconButton(this, xCenter + marginButton, 250, assets.icon.PLUS);
    increateFxVolume.on('pointerdown', () => {
      const volume = settings.getConfig('fxVolume');
      const newVolume = (Math.floor(volume * 10) + 1) / 10;
      settings.setConfig('fxVolume', Math.min(1, newVolume));
      fxValue.setText(asPercentage(settings.getConfig('fxVolume')));
    });

    const decreaseFxVolume = new IconButton(this, xCenter - marginButton, 250, assets.icon.MINUS);
    decreaseFxVolume.on('pointerdown', () => {
      const volume = settings.getConfig('fxVolume');
      const newVolume = (Math.floor(volume * 10) - 1) / 10;
      settings.setConfig('fxVolume', Math.max(0, newVolume));
      fxValue.setText(asPercentage(settings.getConfig('fxVolume')));
    });

    this.container.add([
      musicText,
      musicValue,
      increaseVolume,
      decreaseVolume,
      fxText,
      fxValue,
      increateFxVolume,
      decreaseFxVolume,
    ]);
  }
}
