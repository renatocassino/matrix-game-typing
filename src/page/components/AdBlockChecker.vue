<template>
    <div>
      <div v-if="adblockDetected">
        Parece que você está usando um Adblocker. Por favor, considere desativá-lo para apoiar nosso site.
      </div>
    </div>
  </template>
  
<script lang="ts">
  export default {
    data() {
      return {
        adblockDetected: false,
      };
    },
    mounted() {
      this.checkAdblock();
    },
    methods: {
      checkAdblock() {
        // Criar um novo elemento de imagem
        const testAd = new Image();
  
        testAd.onload = () => {
          // Se a imagem carregar, o Adblock provavelmente não está ativo
          this.adblockDetected = false;
        };
  
        testAd.onerror = () => {
          // Se houver um erro ao carregar a imagem, o Adblock provavelmente está ativo
          this.adblockDetected = true;
        };
  
        // Defina o caminho da imagem para nosso "anúncio" falso
        testAd.src = '/ad-banner.jpg';
      },
    },
  };
  </script>
  