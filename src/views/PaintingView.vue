<script setup lang="ts">
import { useMeta } from 'vue-meta'
import Footer from "@/views/layout/Footer.vue";
import Header from "@/components/Header.vue";
import Container from "@/components/Container.vue";
import ContainerHeader from "@/components/ContainerHeader.vue";
import ContainerGrid from "@/components/ContainerGrid.vue";

useMeta({ title: 'Práškové lakovanie AA lak' });
</script>

<template>

  <Container>

    <container-header>
      <template #title>Práškové lakovanie AA lak</template>
      <template #description>
        Kompletné renovácie brán, zábradlí, konštrukcií, plotov a rôznych predmetov do dĺžky 6.2m, ponúkame
        pieskovanie, práškové lakovanie.
      </template>
    </container-header>

    <container-grid width="full" :main-col=12>

      <template #main>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-8">
          <a href="https://www.facebook.com/AA-lak-Nitra-105147118461395/" target="_blank" class="bg-transparent truncate py-4 px-5 border border-gray-500/30 hover:border-gray-500/50 text-gray-500 hover:text-gray-400 rounded-3xl flex items-center gap-4 text-lg transition">
            <i class="fa-brands fa-square-facebook text-3xl"></i>
            AA lak Nitra
          </a>
          <a href="mailto:dusonemcek@gmail.com" class="bg-transparent truncate py-4 px-5 border border-gray-500/30 hover:border-gray-500/50 text-gray-500 hover:text-gray-400 rounded-3xl flex items-center gap-4 text-lg transition">
            <i class="fa-solid fa-at text-3xl"></i>
            dusonemcek@gmail.com
          </a>
          <a href="tel:+421917693280" class="bg-transparent truncate py-4 px-5 border border-gray-500/30 hover:border-gray-500/50 text-gray-500 hover:text-gray-400 rounded-3xl flex items-center gap-4 text-lg transition">
            <i class="fa-solid fa-mobile-screen-button text-3xl"></i>
            +421 917 693 280
          </a>
          <a href="tel:+421917693280" class="bg-transparent truncate py-4 px-5 border border-gray-500/30 hover:border-gray-500/50 text-gray-500 hover:text-gray-400 rounded-3xl flex items-center gap-4 text-lg transition">
            <i class="fa-solid fa-location-dot text-3xl"></i>
            <span class="text-sm">
              Novozámocká 104/60<br>
              949 05 Nitra
            </span>
          </a>
        </div>
      </template>

    </container-grid>

  </Container>

  <Footer/>

</template>