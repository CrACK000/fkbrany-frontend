<script setup lang="ts">

</script>

<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive exclude="ImageLoading,ReferencesCreateAuth,ReferencesEditAuth">
      <component :is="Component" :key="route.path"/>
    </keep-alive>
  </router-view>
</template>