<script setup lang="ts">
defineProps({
  padding: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div :class="{'p-3 xs:p-4 sm:p-5 md:p-6': padding}">
    <slot></slot>
  </div>
</template>