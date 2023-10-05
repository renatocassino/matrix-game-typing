import { Settings } from './settings';

export class GamePlay extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
    this.registry.set('settings', new Settings(this));
  }
}
