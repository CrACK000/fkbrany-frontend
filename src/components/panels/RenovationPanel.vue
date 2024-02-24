<script setup lang="ts">

import {FwbButton} from "flowbite-vue";
</script>

<template>
  <div class="flex flex-col gap-y-6 py-24 text-center">

    <div class="text-4xl font-semibold text-gray-200">
      Renovácia Vašej starej brány
    </div>

    <div class="mt-4 opacity-75 text-gray-400 max-w-5xl mx-auto">
      Ponúkame renováciu vašej starej brány, vrátime jej krásu novoty a moderného vzhľadu.
      Brána do vášho príbytku je vystavená slnku, mrazu, vetru, dažďu a všetkým poveternostným
      podmienkam ktorým musí odolávať. Ak máte poškodenú konštrukciu alebo lak na Vašej bráne,
      dôkladným opieskovaním a profesionálnym lakovaním vrátime späť jej krásu.
    </div>

    <div class="text-center inline-block mt-10 xl:col-span-1 self-center xl:mx-auto scale-100 hover:scale-105 transition">
      <router-link :to="{ name: 'renovation' }" class="bg-gray-100/5 hover:bg-gray-100/10 transition px-8 py-4 rounded-2xl text-gray-300 hover:text-gray-200 text-lg lg:text-xl font-medium text-nowrap">
        <i class="fa-solid fa-screwdriver-wrench fa-lg me-3.5"></i> Mám záujem o renováciu
      </router-link>
    </div>

  </div>
</template>