<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute();
</script>

<template>
  <ul class="bg-gray-800/50 backdrop-blur-xl rounded-t-2xl lg:rounded-b-2xl shadow-xl p-2 md:p-3 flex flex-row lg:flex-col flex-nowrap gap-1.5 overflow-x-auto">
    <li>
      <router-link :to="{ name: 'dashboard' }" class="whitespace-nowrap group hover:bg-gray-800/40 hover:shadow hover:text-gray-100 flex gap-x-2.5 items-center p-3 md:p-4 text-sm md:text-base rounded-lg transition" :class="[ route.name === 'dashboard' ? 'bg-gray-800/75 shadow text-gray-300' : 'text-gray-500' ]">
        <svg class="w-4 h-4 md:w-6 md:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6a7.5 7.5 0 1 0 8 8h-8V6Z"/>
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 3H13v8h8v-.5A7.5 7.5 0 0 0 13.5 3Z"/>
        </svg> Dashboard
      </router-link>
    </li>
    <li>
      <router-link :to="{ name: 'settings' }" class="whitespace-nowrap group hover:bg-gray-800/40 hover:shadow hover:text-gray-100 flex gap-x-2.5 items-center p-3 md:p-4 text-sm md:text-base rounded-lg transition" :class="[ route.name === 'settings' ? 'bg-gray-800/75 shadow text-gray-300' : 'text-gray-500' ]">
        <svg class="w-4 h-4 md:w-6 md:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"/>
        </svg> Nastavenia
      </router-link>
    </li>
    <li>
      <router-link :to="{ name: 'references-all' }" class="whitespace-nowrap group hover:bg-gray-800/40 hover:shadow hover:text-gray-100 flex gap-x-2.5 items-center p-3 md:p-4 text-sm md:text-base rounded-lg transition" :class="[ (route.name === 'references-all' || route.name === 'references-create' || route.name === 'references-edit') ? 'bg-gray-800/75 shadow text-gray-300' : 'text-gray-500' ]">
        <svg class="w-4 h-4 md:w-6 md:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h3c.6 0 1 .4 1 1v15c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V5c0-.6.4-1 1-1h3m0 3h6m-3 5h3m-6 0h0m3 4h3m-6 0h0m1-13v4h4V3h-4Z"/>
        </svg> Referencie
      </router-link>
    </li>
    <li>
      <router-link :to="{ name: 'logout' }" class="whitespace-nowrap group hover:bg-gray-800/40 hover:shadow hover:text-gray-100 flex gap-x-2.5 items-center p-3 md:p-4 text-sm md:text-base rounded-lg transition text-gray-500">
        <svg class="w-4 h-4 md:w-6 md:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"/>
        </svg> Odhlásiť sa
      </router-link>
    </li>
  </ul>
</template>