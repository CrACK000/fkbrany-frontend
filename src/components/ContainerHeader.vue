<script setup lang="ts">

</script>

<template>
  <div class="mb-16">
    <div class="text-gray-200 text-4xl lg:text-5xl font-semibold mb-10 text-center">
      <slot name="title"/>
    </div>
    <div class="text-gray-500 lg:text-xl max-w-7xl mx-auto text-center">
      <slot name="description"/>
    </div>
  </div>
</template>

<style scoped>

</style>