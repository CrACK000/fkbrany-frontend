<script setup lang="ts">
defineProps({
  width: {
    type: [Number, String],
    default: 6
  },
  sideCol: {
    type: Number,
    default: 4
  },
  mainCol: {
    type: Number,
    default: 8
  }
})
</script>

<template>
  <div :class="`max-w-${width.toString()}xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20`">

    <div v-if="$slots.side" :class="`lg:col-span-${sideCol.toString()}`">
      <slot name="side"></slot>
    </div>

    <div :class="`lg:col-span-${mainCol.toString()} dark`">
      <slot name="main"></slot>
    </div>

  </div>
</template>