<script setup lang="ts">
import { useMeta } from "vue-meta"
import LatestReferences from "@/components/panels/LatestReferences.vue";
import Footer from "@/views/layout/Footer.vue";
import RenovationPanel from "@/components/panels/RenovationPanel.vue";
import Header from "@/components/Header.vue";

useMeta({ title: 'Výroba krídlových a posuvných brán na mieru' });
</script>

<template>

  <Header>
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-y-12 my-auto">

      <div class="xl:col-span-2">
        <div class="max-w-4xl text-3xl lg:text-5xl font-semibold text-gray-200">Výroba krídlových a posuvných brán na mieru.</div>
        <div class="max-w-3xl mt-6 fw-medium text-lg lg:text-2xl opacity-75 text-gray-400">
          Vyrábame ploty, brány a bránky na zákazku podľa konkrétnych požiadaviek zákazníka.
          Všetky brány, plotové dielce či kompletné systémy vyrábame na mieru.
        </div>
      </div>

      <div class="xl:col-span-1 self-center xl:mx-auto scale-100 hover:scale-105 transition">
        <router-link :to="{ name: 'offer' }" class="bg-gray-100/5 hover:bg-gray-100/10 transition px-8 py-4 rounded-2xl text-gray-300 hover:text-gray-200 text-lg lg:text-xl font-medium text-nowrap">
          <i class="fa-regular fa-hand-point-up fa-lg me-3.5"></i> Mám záujem o bránu
        </router-link>
      </div>

    </div>
  </Header>

  <div class="fk__container mx-auto divide-y divide-gray-800 border-t border-gray-800">
    <LatestReferences/>
    <RenovationPanel/>
  </div>

  <Footer/>

</template>