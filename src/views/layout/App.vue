<script setup lang="ts">
import NavBar from "@/views/layout/NavBar.vue";
import {inject, onBeforeMount} from "vue";
import LoadingScreen from "@/components/LoadingScreen.vue";
import references from "@/plugins/references";

const auth = inject<any>('auth')
const loading = auth.loading

onBeforeMount(async () => {
  await references.all()
});
</script>

<template>

  <metainfo>
    <template v-slot:title="{ content }">{{ content }} - FKbrány.sk</template>
  </metainfo>

  <NavBar />

  <RouterView v-slot="{ Component }">
    <keep-alive include="HomeView,ReferencesView" exclude="ImageLoading">
      <component :is="loading ? LoadingScreen : Component"/>
    </keep-alive>
  </RouterView>

</template>