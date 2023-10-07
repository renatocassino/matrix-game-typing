<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CustomWindow } from '../../game/common/types/commonTypes';
import AdViewOnModal from './AdViewOnModal.vue';

const dialog = ref(false);
const closeButton = ref(false);

onMounted(() => {
  (window as CustomWindow).openAdModal = () => {
    dialog.value = true;
    setTimeout(() => {
      closeButton.value = true;
    }, 3000);
  };
});
</script>

<template>
  <v-dialog
    v-model="dialog"
    width="500"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="headline">Ad - Please wait to close</span>
      </v-card-title>
      <v-card-text>
        <ad-view-on-modal />
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="closeButton" color="primary" block @click="dialog = false; closeButton = false">Close Ad</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
