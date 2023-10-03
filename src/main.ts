import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import { Game } from './game/game';
import { MenuScene } from './game/scenes/menuScene';
import { PreloadScene } from './game/scenes/preloadScene';
import { RoundScene } from './game/scenes/roundScene';
import { ScoreScene } from './game/scenes/scoreScene';
import { WaveScene } from './game/scenes/waveScene';
import App from './page/App.vue';
import './style.css';

createApp(App).use(
  createVuetify({
    components,
    directives,
  }),
).mount('#app');

window.addEventListener('load', () => {
  const config: Phaser.Types.Core.GameConfig = {
    width: Math.min(1200, window.innerWidth),
    height: Math.min(720, window.innerHeight),
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#000000',
    scene: [PreloadScene, WaveScene, MenuScene, RoundScene, ScoreScene],
  };

  new Game(config);
});
