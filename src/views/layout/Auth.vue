<script setup lang="ts">
import {onBeforeMount} from "vue";
import references from "@/plugins/references";
import Container from "@/components/Container.vue";
import Footer from "@/views/layout/Footer.vue";
import ContainerGrid from "@/components/ContainerGrid.vue";
import AuthGrid from "@/components/AuthGrid.vue";
import AuthSideMenu from "@/components/app/AuthSideMenu.vue";

onBeforeMount(async () => {
  await references.all()
});
</script>

<template>
  <Container>

    <container-grid width="7xl">

      <div class="lg:col-span-12">
        <auth-grid>

          <template #title>Admin panel</template>

          <template #menu>
            <auth-side-menu/>
          </template>

          <template #router>
            <router-view v-slot="{ Component, route }">
              <keep-alive exclude="ImageLoading,ReferencesCreateAuth,ReferencesEditAuth">
                <component :is="Component" :key="route.path"/>
              </keep-alive>
            </router-view>
          </template>

        </auth-grid>
      </div>

    </container-grid>

  </Container>

  <Footer/>

</template>