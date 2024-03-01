<script setup lang="ts">
import {FwbButton, FwbInput} from "flowbite-vue";
import {ref} from "vue";
import axios from "axios";

const form = ref<any>({
  current_password: '' as string,
  new_password: '' as string,
  repeat_password: '' as string,
})

const loading = ref<boolean>(false)
const errors = ref<any>([])
const success = ref<boolean>(false)
const success_msg = ref<string>()
const changed = ref<boolean>(false)

function cancelButton() {

  form.value.current_password = ''
  form.value.new_password = ''
  form.value.repeat_password = ''

  errors.value = []
  changed.value = false

}

function checkPassword() {

  changed.value = !!(form.value.current_password || form.value.new_password || form.value.repeat_password);
  errors.value = []
  success.value = false

  if (form.value.new_password.length < 6) {
    errors.value.push({ where: 'new_password', message: 'Heslo musí mať minimálne 6 znakov.' })
  }

  if (form.value.new_password !== form.value.repeat_password) {
    errors.value.push({ where: 'repeat_password', message: 'Heslo sa nezhoduje.' })
  }

  if(!errors.value.length) return true;

}

function changePass() {

  if (!checkPassword()) return false
  loading.value = true

  axios.post(`${import.meta.env.VITE_BACKEND}/settings/password`, form.value, { withCredentials: true })
    .then(response => {
      if (response.data.success) {

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

</script>

<template>
  <form @submit.prevent="changePass" @keyup="checkPassword" class="mb-0">
    <div class="max-w-lg flex flex-col gap-y-4">
      <div>Zmeniť heslo</div>
      <fwb-input type="password" label="Staré heslo" v-model="form.current_password">
        <template #prefix>
          <svg class="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1v-7c0-.6.4-1 1-1Z"/>
          </svg>
        </template>
      </fwb-input>
      <fwb-input type="password" label="Nové heslo" v-model="form.new_password" :validation-status="getError('new_password') && 'error'">
        <template #prefix>
          <svg class="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1v-7c0-.6.4-1 1-1Z"/>
          </svg>
        </template>
        <template #validationMessage>{{ getError('new_password') }}</template>
      </fwb-input>
      <fwb-input type="password" label="Zopakujte nové heslo" v-model="form.repeat_password" :validation-status="getError('repeat_password') && 'error'">
        <template #prefix>
          <svg class="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1v-7c0-.6.4-1 1-1Z"/>
          </svg>
        </template>
        <template #validationMessage>{{ getError('repeat_password') }}</template>
      </fwb-input>
    </div>
    <div class="flex justify-between items-center mt-4">
      <div class="text-sm">
        <span v-if="success" v-text="success_msg" class="text-emerald-500"></span>
        <span v-if="getError('main')" v-text="getError('main')" class="text-red-500"></span>
      </div>
      <div class="flex gap-x-2 items-center">
        <fwb-button v-if="changed" type="button" color="alternative" class="-mb-0.5" @click="cancelButton">Zrušiť</fwb-button>
        <fwb-button type="submit" :loading="loading" :disabled="loading">Zmeniť</fwb-button>
      </div>
    </div>
  </form>
</template>