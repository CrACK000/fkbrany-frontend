<template>
  <div v-if="loading">
    <slot name="skeleton"></slot>
  </div>
  <img v-show="!loading" :src="src" @load="onImageLoaded" :class="imgClass" :alt="alt">
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  props: {
    src: String,
    alt: String,
    imgClass: String,
  },
  setup(props) {
    const loading = ref(true);

    const onImageLoaded = () => {
      loading.value = false;
    }

    return {
      loading,
      onImageLoaded
    };
  }
}
</script>