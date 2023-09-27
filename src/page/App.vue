<script setup lang="ts">
import buyMeACoffee from './assets/buy-me-a-coffee.png';
import ChartModal from './components/ChartModal.vue';
</script>

<template>
  <div class="content">
    <section id="game"></section>

    <div class="buy-me-a-coffee">
      <a href="https://www.buymeacoffee.com/cassinodev" target="_blank" rel="noopener noreferrer">
        <img :src="buyMeACoffee" alt="Buy me a coffee" />
      </a>
    </div>

    <chart-modal />
  </div>
</template>

<style scoped>
.buy-me-a-coffee img {
  max-width: 150px;
}
</style>
