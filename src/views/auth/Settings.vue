<script setup lang="ts">
import {FwbButton, FwbInput} from "flowbite-vue";
import {ref} from "vue";
import {useMeta} from "vue-meta";
import PanelForm from "@/components/PanelForm.vue";
import PanelItem from "@/components/PanelItem.vue";
import Panel from "@/components/Panel.vue";

useMeta({ title: "Nastavenia" })

const formSettings = ref<any>({
  receiving_mail: '' as string,
})

const formPassword = ref<any>({
  current_password: '' as string,
  new_password: '' as string,
  repeat_password: '' as string,
})

</script>

<template>

  <panel>
    <panel-item>

      <div class="max-w-lg flex flex-col gap-y-4">
        <div>Nastavenia webu</div>
        <fwb-input type="text" label="Emailová adresa na prijímanie" v-model="formSettings.receiving_mail">
          <template #prefix>
            <i class="fa-solid fa-at text-gray-400"></i>
          </template>
          <template #helper>
            Všetky požiadavky budú odoslané na túto emailovú adresu.
          </template>
        </fwb-input>
      </div>
      <div class="flex justify-end mt-4">
        <fwb-button type="submit">
          Uložiť
        </fwb-button>
      </div>

    </panel-item>
    <panel-item>

      <div class="max-w-lg flex flex-col gap-y-4">
        <div>Zmeniť heslo</div>
        <fwb-input type="password" label="Staré heslo" v-model="formPassword.current_password">
          <template #prefix>
            <svg class="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1v-7c0-.6.4-1 1-1Z"/>
            </svg>
          </template>
        </fwb-input>
        <fwb-input type="password" label="Nové heslo" v-model="formPassword.new_password">
          <template #prefix>
            <svg class="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1v-7c0-.6.4-1 1-1Z"/>
            </svg>
          </template>
        </fwb-input>
        <fwb-input type="password" label="Zopakujte nové heslo" v-model="formPassword.repeat_password">
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

    </panel-item>
  </panel>

</template>