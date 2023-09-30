export type SettingsType = {
  musicVolume: number;
  fxVolume: number;
}

export class Settings {
  settings: SettingsType;

  constructor(readonly game: Phaser.Game) {
    let localSettings = {};
    try {
      const settingsLocalString = localStorage.getItem('_settingsValue') ?? '{}';
      localSettings = JSON.parse(settingsLocalString) as SettingsType;
    } catch (error) {
      console.error(error);
    }

    this.settings = {
      musicVolume: 0.5,
      fxVolume: 1.0,
      ...localSettings,
    };
    this.update();
  }

  setConfig<K extends keyof SettingsType>(attr: K, value: SettingsType[K]) {
    this.settings[attr] = value;
    this.update();
  }

  getConfig<K extends keyof SettingsType>(attr: K): SettingsType[K] {
    return this.settings[attr];
  }

  update() {
    localStorage.setItem('_settingsValue', JSON.stringify(this.settings));
    this.game.registry.set('_settingsValue', this.settings);
  }
}