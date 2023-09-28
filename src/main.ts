import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import { Game } from './game/game';
import { BoardScene } from './game/scenes/boardScene';
import { MenuScene } from './game/scenes/menuScene';
import { ScoreScene } from './game/scenes/scoreScene';
import App from './page/App.vue';
import './style.css';

createApp(App).use(
  createVuetify({
    components,
    directives,
  })
).mount('#app')

window.addEventListener('load', () => {
  const config: Phaser.Types.Core.GameConfig = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#000000',
    scene: [MenuScene, BoardScene, ScoreScene],
  };

  new Game(config);
});

