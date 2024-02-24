<script setup lang="ts">

</script>

<template>
  <div class="mb-3 md:mb-8 text-2xl md:text-4xl font-light text-gray-600">

    <slot name="title"/>

  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-0 items-start">

    <slot name="menu"/>

    <div class="lg:col-span-2 bg-gray-800/50 backdrop-blur-xl rounded-b-2xl lg:rounded-t-2xl shadow-xl border-t border-gray-800 lg:border-0">

      <slot name="router"/>

    </div>

  </div>
</template>