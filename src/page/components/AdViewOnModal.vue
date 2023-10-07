<template>
  <!-- Modal no fim do jogo -->
  <ins class="adsbygoogle"
    style="display:block"
    data-ad-client="ca-pub-5565264719549091"
    data-ad-slot="5566080110"
    data-ad-format="auto"
    data-full-width-responsive="true"></ins>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { CustomWindow } from '../../game/common/types/commonTypes';

onMounted(() => {
  ((window as CustomWindow).adsbygoogle = (window as CustomWindow).adsbygoogle || []).push({});
});
</script>
