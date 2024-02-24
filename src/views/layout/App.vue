<script setup lang="ts">
import NavBar from "@/views/layout/NavBar.vue";
import {inject, onMounted} from "vue";
import LoadingScreen from "@/components/LoadingScreen.vue";
import {FwbToast} from "flowbite-vue";
import references from "@/plugins/references";

const auth = inject<any>('auth')
const loading = auth.loading

onMounted(async () => {
  await references.all()
});
</script>

<template>

  <metainfo>
    <template v-slot:title="{ content }">{{ content }} - FKbrány.sk</template>
  </metainfo>

  <NavBar />

  <RouterView v-slot="{ Component }">
    <keep-alive include="HomeView,ReferencesView">
      <component :is="loading ? LoadingScreen : Component"/>
    </keep-alive>
  </RouterView>

</template>