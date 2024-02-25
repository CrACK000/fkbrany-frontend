<script setup lang="ts">
interface ContainerGrid {
  width?: 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full'
}

const props = withDefaults(defineProps<ContainerGrid>(), {
  width: '6xl'
})
</script>

<template>
  <div :class="`grid grid-cols-1 gap-20 lg:grid-cols-12 max-w-${props.width} mx-auto`">

    <slot></slot>

  </div>
</template>