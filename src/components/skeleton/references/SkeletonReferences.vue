<script setup lang="ts">
const props = defineProps({
  rows: {
    type: Number,
    default: 9,
  }
})
</script>

<template>
  <div v-for="key in props.rows" class="flex items-center justify-center w-full h-44 xxs:h-48 xs:h-52 md:h-44 lg:h-36 xl:h-52 2xl:h-64 bg-gray-800/70 rounded-3xl animate-pulse" :key="key">
    <svg class="w-24 h-24 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
    </svg>
  </div>
</template>