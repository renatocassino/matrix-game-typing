import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import App from './App.vue';
import { Game } from './game';
import { BoardScene } from './scenes/boardScene';
import { MenuScene } from './scenes/menuScene';
import { ScoreScene } from './scenes/scoreScene';
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

