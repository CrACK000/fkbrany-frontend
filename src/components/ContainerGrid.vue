<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: '6'
  },
  side: {
    type: Boolean,
    default: true
  },
  sideCol: {
    type: String,
    default: '4'
  },
  mainCol: {
    type: String,
    default: '8'
  }
})
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-20" :class="`max-w-${width}xl mx-auto`">

    <template v-if="side">
      <div :class="`lg:col-span-${sideCol}`">
        <slot name="side"></slot>
      </div>
    </template>

    <template v-if="$slots.main">
      <div :class="`lg:col-span-${mainCol} dark`">
        <slot name="main"></slot>
      </div>
    </template>

  </div>
</template>