import { Scene } from 'phaser';
import { asPercentage } from '../../../../utils/string';
import { CardModal } from '../../../common/components/ui/cardModal';
import { IconButton } from '../../../common/components/ui/iconButton';
import { Overlay } from '../../../common/components/ui/overlay';
import { assets } from '../../../common/constants/assets';
import { Settings } from '../../../common/settings';

export class SettingsModalComponent extends Phaser.GameObjects.Container {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    this.visible = false;

    const settings = scene.game.registry.get('settings') as Settings;

    const overlay = new Overlay(scene).setEventToClose(() => this.close());
    this.add(overlay);

    const bgSettings = new CardModal(scene, 0, 0);
    bgSettings.on('pointerdown', ({ event }: { event: MouseEvent }) => {
      event.stopPropagation();
    });
    const areaWidth = bgSettings.width * bgSettings.scaleY;
    this.add(bgSettings);

    const settingsText = scene.add.text(0, 0, 'Settings', { font: '24px Orbitron', color: '#fff' }).setOrigin(0.5, 0.5).setY(-220);
    this.add(settingsText);

    scene.input.keyboard?.on('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });

    const text = scene
      .add
      .text(0, 0, 'Press ESC to close', { font: '14px Orbitron', color: '#fff' })
      .setOrigin(0.5, 0.5).setY(230);
    this.add(text);

    const closeButton = new IconButton(scene, areaWidth / 2 - 30, -245, assets.icon.CLOSE);
    closeButton.on('pointerdown', () => {
      this.close();
    });

    const musicText = scene
      .add
      .text(0, 0, 'Music Volume', { font: '18px Orbitron', color: '#fff' })
      .setOrigin(0.5, 0.5)
      .setY(-150)
      .setAlpha(0.6);
    this.add(musicText);

    const musicValue = scene.add.text(0, 0, asPercentage(settings.getConfig('musicVolume')), { font: '18px Orbitron', color: '#fff' }).setOrigin(0.5, 0.5).setY(-120);
    this.add(musicValue);

    const increaseVolume = new IconButton(scene, 50, -120, assets.icon.PLUS);
    increaseVolume.on('pointerdown', () => {
      const volume = settings.getConfig('musicVolume');
      const newVolume = (Math.floor(volume * 10) + 1) / 10;
      settings.setConfig('musicVolume', Math.min(1, newVolume));
      musicValue.setText(asPercentage(settings.getConfig('musicVolume')));
    });
    this.add(increaseVolume);

    const decreaseVolume = new IconButton(scene, -50, -120, assets.icon.MINUS);
    decreaseVolume.on('pointerdown', () => {
      const volume = settings.getConfig('musicVolume');
      const newVolume = (Math.floor(volume * 10) - 1) / 10;
      settings.setConfig('musicVolume', Math.max(0, newVolume));
      musicValue.setText(asPercentage(settings.getConfig('musicVolume')));
    });
    this.add(decreaseVolume);

    const fxText = scene
      .add
      .text(0, 0, 'FX Volume', { font: '18px Orbitron', color: '#fff' })
      .setOrigin(0.5, 0.5)
      .setY(-60)
      .setAlpha(0.6);
    this.add(fxText);

    const fxValue = scene
      .add
      .text(0, 0, asPercentage(settings.getConfig('fxVolume')), { font: '18px Orbitron', color: '#fff' })
      .setOrigin(0.5, 0.5)
      .setY(-30);
    this.add(fxValue);

    const increateFxVolume = new IconButton(scene, 50, -30, assets.icon.PLUS);
    increateFxVolume.on('pointerdown', () => {
      const volume = settings.getConfig('fxVolume');
      const newVolume = (Math.floor(volume * 10) + 1) / 10;
      settings.setConfig('fxVolume', Math.min(1, newVolume));
      fxValue.setText(asPercentage(settings.getConfig('fxVolume')));
    });

    const decreaseFxVolume = new IconButton(scene, -50, -30, assets.icon.MINUS);
    decreaseFxVolume.on('pointerdown', () => {
      const volume = settings.getConfig('fxVolume');
      const newVolume = (Math.floor(volume * 10) - 1) / 10;
      settings.setConfig('fxVolume', Math.max(0, newVolume));
      fxValue.setText(asPercentage(settings.getConfig('fxVolume')));
    });
    this.add(increateFxVolume);
    this.add(decreaseFxVolume);
    this.add(closeButton);
    scene.add.existing(this);
  }

  open() {
    this.alpha = 0;
    this.visible = true;
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 300,
    });
    this.setDepth(100);
  }

  close() {
    this.alpha = 1;
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 300,
      complete: () => {
        this.visible = false;
        this.setDepth(0);
      },
    });
  }
}
