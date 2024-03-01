<script setup lang="ts">
import {FwbButton, FwbInput, FwbSpinner} from "flowbite-vue";
import {onBeforeMount, ref} from "vue";
import axios from "axios";
import settings from "@/plugins/settings";

const data = ref<Settings>(settings.data.value)
const form = ref<any>({
  receiving_email: data.value.receiving_email,
  foo: 'Ahoj',
})

const errors = ref<any>([])
const loading = ref<boolean>(false)
const success = ref<boolean>(false)
const success_msg = ref<string>()
const changed = ref<boolean>(false)

const validEmail = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'email');
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  if (!emailRegex.test(form.value.receiving_email)) {
    errors.value.push({ where: "email", message: "Nesprávny formát emailu." })
  }
}

function cancelWebSettings() {

  Object.keys(form.value).forEach((key) => {
    if (key in data.value) {
      form.value[key] = (data.value as any)[key];
    }
  })

  errors.value = []
  changed.value = false

}

function compareFormAndData() {
  return Object.keys(form.value).every((key) => {
    if (key in data.value) {
      return form.value[key] === (data.value as any)[key];
    }
    return false;
  });
}

function checkWebSettings() {

  changed.value = !compareFormAndData()
  errors.value = []
  success.value = false

  validEmail()

  if(!errors.value.length) return true;

}

function updateWebSettings() {

  if (!checkWebSettings()) return false

  loading.value = true

  axios.post(`${import.meta.env.VITE_BACKEND}/settings/web`, form.value, { withCredentials: true })
    .then(response => {
      if (response.data.success) {

        Object.keys(settings.data.value).forEach((key) => {
          if (key in response.data.document) {
            (settings.data.value as any)[key] = (response.data.document as any)[key];
          }
        })

        changed.value = false
        success.value = true
        success_msg.value = response.data.message

      } else {

        errors.value.push({ where: "main", message: response.data.message })

      }
    })
    .catch(error => {

      errors.value.push({ where: "main", message: "Server neodpovedá. Skúste to neskôr." })

    })
    .finally(() => {

      loading.value = false

    })

}

function getError(search: any) {
  const emailError = errors.value.find((error: any) => error.where === search);
  return emailError ? emailError.message : '';
}

onBeforeMount(async () => {
  await settings.load()

  data.value = settings.data.value

  Object.keys(form.value).forEach((key) => {
    if (key in settings.data.value) {
      form.value[key] = (settings.data.value as any)[key];
    }
  })
})

</script>

<template>
  <form @submit.prevent="updateWebSettings" @keyup="checkWebSettings" class="mb-0">

    <div class="max-w-lg flex flex-col gap-y-4">
      <div>Nastavenia webu</div>
      <fwb-input type="email" label="Emailová adresa na prijímanie" v-model="form.receiving_email" :validation-status="getError('email') && 'error'">
        <template #prefix><i class="fa-solid fa-at text-gray-400"></i></template>
        <template #helper>Všetky požiadavky budú odoslané na túto emailovú adresu.</template>
        <template #validationMessage>{{ getError('email') }}</template>
      </fwb-input>
    </div>
    <div class="flex justify-between items-center mt-4">
      <div class="text-sm">
        <span v-if="success" v-text="success_msg" class="text-emerald-500"></span>
        <span v-if="getError('main')" v-text="getError('main')" class="text-red-500"></span>
      </div>
      <div class="flex gap-x-2 items-center">
        <fwb-button v-if="changed" type="button" color="alternative" class="-mb-0.5" @click="cancelWebSettings">Zrušiť</fwb-button>
        <fwb-button type="submit" :loading="loading" :disabled="loading">Uložiť</fwb-button>
      </div>
    </div>

    <div v-if="settings.loading.value" class="absolute top-0 right-0 w-full h-full bg-gray-800/30 p-4">
      <fwb-spinner class="ms-auto" size="6"/>
    </div>

  </form>
</template>