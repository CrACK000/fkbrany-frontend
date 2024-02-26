<template>
  <div v-if="loading">
    <slot name="skeleton"></slot>
  </div>
  <img v-show="!loading" :src="src" @load="onImageLoaded" :class="imgClass" :alt="alt">
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

defineProps({
  src: String,
  alt: String,
  imgClass: String,
})

const loading = ref(false);

const onImageLoaded = () => {
  loading.value = false;
}

onMounted(() => {
  loading.value = true;
})
</script>