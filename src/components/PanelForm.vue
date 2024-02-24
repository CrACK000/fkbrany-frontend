<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  submit: {
    type: Function as PropType<(payload: Event) => void>,
    required: true,
  },
  keyup: {
    type: Function as PropType<(payload: KeyboardEvent) => void>,
  }
})
</script>

<template>
  <div class="w-full text-gray-400 dark">
    <form @submit.prevent="submit" @keyup="keyup" class="flex flex-col divide-y divide-gray-800 w-full mb-0">
      <slot></slot>
    </form>
  </div>
</template>