<script setup lang="ts">
import {FwbButton, FwbInput} from "flowbite-vue";
import {ref} from "vue";

const form = ref<any>({
  current_password: '' as string,
  new_password: '' as string,
  repeat_password: '' as string,
})

</script>

<template>
  <form @submit.prevent="" @keyup="">
    <div class="max-w-lg flex flex-col gap-y-4">
      <div>Zmeniť heslo</div>
      <fwb-input type="password" label="Staré heslo" v-model="form.current_password">
        <template #prefix>
          <svg class="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1v-7c0-.6.4-1 1-1Z"/>
          </svg>
        </template>
      </fwb-input>
      <fwb-input type="password" label="Nové heslo" v-model="form.new_password">
        <template #prefix>
          <svg class="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1v-7c0-.6.4-1 1-1Z"/>
          </svg>
        </template>
      </fwb-input>
      <fwb-input type="password" label="Zopakujte nové heslo" v-model="form.repeat_password">
        <template #prefix>
          <svg class="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1v-7c0-.6.4-1 1-1Z"/>
          </svg>
        </template>
      </fwb-input>
    </div>
    <div class="flex justify-end mt-4">
      <fwb-button type="submit">
        Zmeniť
      </fwb-button>
    </div>
  </form>
</template>