<script setup lang="ts">
import {useMeta} from "vue-meta";
import {inject, onBeforeMount, ref} from "vue";
import references from "@/plugins/references";
import {timeSince} from "@/plugins/dates";

useMeta({ title: "Dashboard" })

const auth = inject<any>('auth')
const last_login = ref<string>(auth.userData.value.last_login)
const views_count_references = ref(0)

onBeforeMount(async () => {
  await references.all()

  for (let reference of references.data.references) {
    if (reference.views !== undefined) {
      views_count_references.value += reference.views
    }
  }

})

</script>

<template>
  <div class="p-6 md:p-8 text-gray-400">
    <div class="grid lg:grid-cols-2 gap-12">
      <div class="flex flex-col gap-y-6 p-4 md:p-6 bg-gray-800 rounded-xl">
        <div class="flex justify-between gap-x-5 items-center">
          <svg class="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
          </svg>
          <div class="text-2xl font-medium">
            {{ timeSince(last_login) }}
          </div>
        </div>
        <div class="text-sm mt-auto opacity-75 text-end">
          Posledné prihlásenie
        </div>
      </div>
      <div class="flex flex-col gap-y-6 p-4 md:p-6 bg-gray-800 rounded-xl">
        <div class="flex justify-between gap-x-5 items-center">
          <svg class="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"/>
            <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          </svg>
          <div class="text-4xl font-bold">
            {{ views_count_references }}
          </div>
        </div>
        <div class="text-sm mt-auto opacity-75 text-end">
          Všetky zobrazenia
        </div>
      </div>
    </div>
  </div>
</template>