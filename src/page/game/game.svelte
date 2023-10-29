<script lang="ts">
  import { onMount } from 'svelte';
  import { BaseModal } from '../../game/common/components/ui/baseModal';
  import { GamePlay } from '../../game/gamePlay';
  import { InfoModal } from '../../game/menu/components/ui/infoModal';
  import { SettingsModal } from '../../game/menu/components/ui/settingsModal';
  import { MenuScene } from '../../game/menu/menuScene';
  import { PreloadScene } from '../../game/preload/preloadScene';
  import { WaveScene } from '../../game/round/animations/waveScene';
  import { RoundModal } from '../../game/round/components/ui/RoundModal';
  import { RoundScene } from '../../game/round/roundScene';
  import { ScoreScene } from '../../game/score/scoreScene';
  import { TrainingMenuScene } from '../../game/training/scenes/trainingMenuScene';
  import { TrainingModeScene } from '../../game/training/scenes/trainingModeScene';

  onMount(() => {
    const config: Phaser.Types.Core.GameConfig = {
      width: Math.min(1200, window.innerWidth),
      height: Math.min(720, window.innerHeight),
      type: Phaser.AUTO,
      parent: 'game',
      backgroundColor: '#000000',
      scene: [
        PreloadScene,
        BaseModal,
        InfoModal,
        RoundModal,
        TrainingMenuScene,
        SettingsModal,
        WaveScene,
        MenuScene,
        RoundScene,
        TrainingModeScene,
        ScoreScene
      ]
    };

    new GamePlay(config);
  });
</script>

<div class="game-container">
  <div id="game" />
</div>

<style scoped>
  .game-container::before {
    background-image: url(bg.jpg);
    background-repeat: repeat;
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.1;
    min-height: 100vh;
  }
  #game {
    max-width: 1280px;
    margin: 0 auto;
    min-height: 400px;
    text-align: center;
  }
</style>
