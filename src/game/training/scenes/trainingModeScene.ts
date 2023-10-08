import { TrainingLevel } from '../levels';

export class TrainingModeScene extends Phaser.Scene {
  static readonly key = 'TrainingModeScene';

  level!: TrainingLevel;

  constructor(config: Phaser.Types.Scenes.SettingsConfig) {
    super({ key: TrainingModeScene.key, ...(config ?? {}) });
  }

  init(data: { level: TrainingLevel }) {
    this.level = data.level;
  }
}
