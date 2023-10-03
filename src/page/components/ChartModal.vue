<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CustomWindow } from '../../commonTypes';
import chart from './ChartWpm.vue';

const dialog = ref(false);

onMounted(() => {
  (window as CustomWindow).openScoreModal = () => {
    dialog.value = true;
  };
});
</script>
<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Score</span>
      </v-card-title>
      <v-card-text>
        <chart />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
