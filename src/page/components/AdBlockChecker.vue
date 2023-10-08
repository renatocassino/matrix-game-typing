<template>
    <div>
      <div v-if="adblockDetected">
        Parece que você está usando um Adblocker. Por favor, considere desativá-lo para apoiar nosso site.
      </div>
    </div>

    <v-dialog
      v-model="dialog"
      width="500"
      persistent
      overlay-color="black"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Adblock detected</span>
        </v-card-title>
        <v-card-text>
          <div>
            Hey there! We noticed your Adblock is on. I get it; most BigTechs exploit your data to serve you ads. I mean, I could be out there doing all sorts of dubious deeds, but instead, I'm here humbly asking you to give our ads a chance. It's our only way to keep the lights on.
            <br /><br />But, of course, no pressure. In 10 seconds, you can close this popup and game on. Enjoy!
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="closeDialog" color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue';
const adblockDetected = ref(false);
const dialog = ref(false);
const closeDialog = ref(false);

onMounted(() => {
  const testAdScript = document.createElement('script');
  testAdScript.onload = () => {
    adblockDetected.value = false;
  };
  testAdScript.onerror = () => {
    dialog.value = true;
    adblockDetected.value = true;
    setTimeout(() => {
      closeDialog.value = true;
    }, 10000);
  };

  testAdScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  document.body.appendChild(testAdScript);
});
</script>
