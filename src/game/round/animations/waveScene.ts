import { gaEvents } from '../../common/events';
import { WaveAnimation } from '../components/waveAnimation';

export class WaveScene extends Phaser.Scene {
  static key = 'WaveScene';

  waveNumber: number = 0;

  // eslint-disable-next-line class-methods-use-this
  callback: () => void = () => {};

  constructor() {
    super({ key: WaveScene.key });
  }

  init(data: { wave: number; cb: () => void }) {
    this.waveNumber = data.wave;
    this.callback = data.cb;
  }

  create() {
    const boardWidth = this.sys.game.canvas.width;
    const boardHeight = this.sys.game.canvas.height;
    const wave = new WaveAnimation(this, boardWidth / 2, boardHeight / 2);
    wave.setWave(this.waveNumber);
    wave.play(this.callback);
    gaEvents.nextWave(this.waveNumber);
  }
}
