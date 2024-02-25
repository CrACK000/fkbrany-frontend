<script setup lang='ts'>
import { ref, computed, onMounted } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import NavbarLinks from '@/components/app/NavbarLinks.vue';

const navbarLinks = [
  {
    title: 'Domovská stránka',
    to: { name: 'home' }
  },
  {
    title: 'Naše referencie',
    to: { name: 'references' }
  },
  {
    title: 'Renovácia brány',
    to: { name: 'renovation' }
  },
  {
    title: 'Požiadať o cenu',
    to: { name: 'offer' }
  },
  {
    title: 'Kontakt',
    to: { name: 'contact' }
  },
  {
    title: 'Práškové lakovanie',
    to:  { name: 'aalak' }
  },
  {
    title: 'login',
    to:  { name: 'login' }
  }
];

const sidebar = ref(false);

const firstHalfLinks = computed(() => navbarLinks.slice(0, navbarLinks.length / 2));
const secondHalfLinks = computed(() => navbarLinks.slice(navbarLinks.length / 2));

</script>

<template>
  <div>

    <nav class="navbar-scroll">
      <div class="flex justify-between items-center xl:w-11/12 px-3 mx-auto">

        <NavbarLinks :links="firstHalfLinks" class="hidden 2xl:flex items-center gap-4"/>

        <router-link :to="{ name: 'home' }">
          <img src="/img/logo_white.svg" id="navbar-logo" class="transition w-[86px] lg:w-[128px] opacity-75 hover:opacity-100 scale-100 hover:scale-105" alt="FKBRANY LOGO">
        </router-link>

        <NavbarLinks :links="secondHalfLinks" class="hidden 2xl:flex items-center gap-4"/>

        <div class="ms-auto block 2xl:hidden">
          <button @click="sidebar = true" id="navbar-menu" class="bg-gray-800 backdrop-blur p-1.5 text-gray-400 rounded-lg shadow-md">
            <svg class="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/>
            </svg>
          </button>
        </div>

      </div>
    </nav>

    <TransitionRoot as="template" :show="sidebar" style="z-index: 1090;">
      <Dialog as="div" class="relative z-10" @close="sidebar = false">
        <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <TransitionChild as="template" enter="transform transition ease-in-out duration-300 sm:duration-400" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-300 sm:duration-400" leave-from="translate-x-0" leave-to="translate-x-full">
                <DialogPanel class="pointer-events-auto relative w-screen max-w-md">
                  <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div class="pt-8 xxs:pt-10 md:pt-12 px-8 xxs:px-10 md:px-12">

                      <DialogTitle class="flex justify-between items-center">
                        <div>
                          <img src="/img/logo_light_black.svg" class="w-20 opacity-75" alt="Logo">
                        </div>
                        <div>
                          <button type="button" class="bg-gray-200 p-1.5 text-gray-600 rounded-md" @click="sidebar = false">
                            <svg class="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6m0 12L6 6"/>
                            </svg>
                          </button>
                        </div>
                      </DialogTitle>

                    </div>
                    <div class="py-8 xxs:py-10 md:py-12 px-2 xs:px-6 md:px-12">
                      <div class="flex flex-col divide-y divide-gray-200/75 text-black">
                        <router-link v-for="link in navbarLinks" @click="sidebar = false" :to="link.to" class="py-4 px-5">
                          {{ link.title }}
                        </router-link>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

  </div>
</template>