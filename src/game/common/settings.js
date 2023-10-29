/**
 * @typedef {import('./settings.type').SettingsType} SettingsType
 */

/** @type {import("./settings.type").SettingsType} */
export const defaultSettings = {
  musicVolume: 0.5,
  fxVolume: 0.5,
};

export class Settings {
  /**
   * @param {Phaser.Game} game
   */
  constructor(game) {
    this.game = game;
    let localSettings = {};
    try {
      const settingsLocalString = localStorage.getItem('_settingsValue') ?? '{}';
      /** @type {SettingsType} */
      localSettings = JSON.parse(settingsLocalString);
    } catch (error) {
      console.error(error);
    }

    this.settings = {
      musicVolume: 0.5,
      fxVolume: 0.5,
      ...localSettings,
    };
    this.update();
  }

  /**
      * @template {keyof SettingsType} K
      * @param {K} attr
      * @param {SettingsType[K]} value
      */
  setConfig(attr, value) {
    this.settings[attr] = value;
    this.update();
  }

  /**
   * @template {keyof SettingsType} K
   * @param {K} attr
   * @returns {SettingsType[K]}
   */
  getConfig(attr) {
    return this.settings[attr];
  }

  update() {
    localStorage.setItem('_settingsValue', JSON.stringify(this.settings));
    this.game.registry.set('_settingsValue', this.settings);
  }
}
