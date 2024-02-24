<script setup lang="ts">
import {useMeta} from "vue-meta";
import {FwbButton, FwbInput, FwbTextarea} from "flowbite-vue";
import Footer from "@/views/layout/Footer.vue";
import {ref} from "vue";
import axios from "axios";
import Container from "@/components/Container.vue";
import PanelForm from "@/components/PanelForm.vue";
import PanelItem from "@/components/PanelItem.vue";
import ContainerHeader from "@/components/ContainerHeader.vue";
import ContainerGrid from "@/components/ContainerGrid.vue";

useMeta({title: 'Kontaktujte nás'});

const form = ref<Contact>({
  name: '' as string,
  email: '' as string,
  mobile: '' as string,
  msg: '' as string,
})

const errors = ref<any>([])
const loading = ref<boolean>(false)
const success = ref<boolean>(false)
const fail = ref<boolean>(false)
const status = ref<string>('')

const checkForm = () => {
  errors.value = [];
  validName()
  validEmail()
  validMobile()
  validMessage()
  if(!errors.value.length) return true;
}
const sendForm = () => {

  fail.value = false

  if (!checkForm()) return false

  loading.value = true

  axios.post(`${import.meta.env.VITE_BACKEND}/send-contact`, form.value, { withCredentials: true })
    .then(response => {
      if (response.data.success) {
        success.value = true
        status.value = response.data.message
      } else {
        errors.value = response.data.errors
        fail.value = true
        status.value = response.data.message
      }
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      loading.value = false
    })
}

const validName = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'name');
  if (form.value.name.length < 3)
    errors.value.push({ where: "name", message: "Meno musí obsahovať minimálne 3 znaky."})
  if (form.value.name.length > 30)
    errors.value.push({ where: "name", message: "Meno je príliš dlhé."})
}
const validEmail = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'email');
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  if (!emailRegex.test(form.value.email)) {
    errors.value.push({ where: "email", message: "Nesprávny formát emailu." })
  }
}
const validMobile = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'mobile');
  if (form.value.mobile) {
    const mobileRegex = /^[+]\+?[1-9][0-9]{11,15}$/
    if (!mobileRegex.test(form.value.mobile)) {
      errors.value.push({where: 'mobile', message: 'Nesprávny formát tel. čísla.'})
    }
  }
}
const validMessage = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'msg');
  if (!form.value.msg) {
    errors.value.push({ where: "msg", message: "Napíšte správu." });
  } else if (form.value.msg.length < 100) {
    errors.value.push({ where: "msg", message: "Správa musí obsahovať minimálne 100 znakov." });
  }
}

const getError = (search: any) => {
  const emailError = errors.value.find((error: any) => error.where === search);
  return emailError ? emailError.message : '';
}

</script>

<template>

  <Container>

    <container-header>
      <template #title>Kontaktujte nás</template>
      <template #description>
        V prípade akýchkoľvek otázok nás neváhajte kontaktovať. Kontaktovať nás môžete prostredníctvom našich
        sociálnych sieti, e-mailom alebo telefonicky. Tiež môžete využiť kontaktný formulár nižšie.
      </template>
    </container-header>

    <container-grid>
      <template #side>

        <div class="text-2xl font-semibold py-3 text-gray-300">FK brány s. r. o.</div>
        <ul class="flex flex-col divide-y divide-gray-800 my-6">
          <li class="flex gap-2 items-center py-3">
            <div class="w-28 font-semibold">E-Mail:</div>
            <a href="mailto:branyfk@gmail.com" class="fk__link">branyfk@gmail.com</a>
          </li>
          <li class="flex gap-x-2 items-center py-3">
            <div class="w-28 font-semibold">Telefón:</div>
            <a href="tel:+421 948 910 909" class="fk__link">+421 948 910 909</a>
          </li>
        </ul>
        <div class="grid grid-cols-3 gap-3 text-gray-300">
          <div class="text-center bg-gray-800/50 backdrop-blur group hover:bg-gray-700/30 transition rounded-xl">
            <a href="https://www.facebook.com/fkbrany" target="_blank" class="px-0.5 py-6 block transition duration-200 text-gray-400 group-hover:text-gray-300">
              <i class="fa-brands fa-facebook fa-2xl"></i>
              <div class="opacity-50 text-sm mt-3 hidden md:block text-center truncate">fkbrany</div>
            </a>
          </div>
          <div class="text-center bg-gray-800/50 backdrop-blur group hover:bg-gray-700/30 transition rounded-xl">
            <a href="https://www.instagram.com/fkbrany.sk/" target="_blank" class="px-0.5 py-6 block transition duration-200 text-gray-400 group-hover:text-gray-300">
              <i class="fa-brands fa-instagram fa-2xl"></i>
              <div class="opacity-50 text-sm mt-3 hidden md:block text-center truncate">fkbrany.sk</div>
            </a>
          </div>
          <div class="text-center bg-gray-800/50 backdrop-blur group hover:bg-gray-700/30 transition rounded-xl">
            <a href="https://www.tiktok.com/@fkbrany.sk" target="_blank" class="px-0.5 py-6 block transition duration-200 text-gray-400 group-hover:text-gray-300">
              <i class="fa-brands fa-tiktok fa-2xl"></i>
              <div class="opacity-50 text-sm mt-3 hidden md:block text-center truncate">@fkbrany.sk</div>
            </a>
          </div>
        </div>

      </template>

      <template #main>

        <div class="fk__form-card">
          <panel-form :submit="sendForm" :keyup="checkForm">
            <panel-item>
              <div class="text-lg sm:text-xl">Kontaktný formulár</div>
            </panel-item>
            <panel-item v-if="success || fail" :padding="false">
              <div class="w-full h-auto px-4 xs:px-6 lg:px-8 py-4 md:py-6 border-b" :class="{ 'bg-green-900/50 border-green-400/50 text-green-400': success, 'bg-red-900/50 border-red-400/50 text-red-400': fail }">
                <svg v-if="success" class="w-6 h-6 inline -mt-1 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <svg v-if="fail" class="w-6 h-6 inline -mt-1 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                {{ status }}
              </div>
            </panel-item>
            <panel-item>

              <div class="flex flex-col gap-6 md:p-6">
                <fwb-input label="Vaše meno a priezvisko" placeholder="Jozef Novák" size="lg" :validation-status="getError('name') && 'error'" @keyup="validName" v-model="form.name" class="max-w-md">
                  <template #validationMessage>{{ getError('name') }}</template>
                </fwb-input>
                <fwb-input label="Emailová adresa" placeholder="vas@email.com" size="lg" :validation-status="getError('email') && 'error'" @keyup="validEmail" v-model="form.email" class="max-w-md">
                  <template #validationMessage>{{ getError('email') }}</template>
                </fwb-input>
                <fwb-input label="Telefónne číslo" placeholder="+421" size="lg" :validation-status="getError('mobile') && 'error'" @keyup="validMobile" v-model="form.mobile" class="max-w-md">
                  <template #validationMessage>{{ getError('mobile') }}</template>
                </fwb-input>
                <div>
                  <fwb-textarea :rows="4" label="Správa" placeholder="Napíšte správu..." @keyup="validMessage" v-model="form.msg"></fwb-textarea>
                  <div v-if="getError('msg')" class="text-sm text-red-500 mt-2" v-text="getError('msg')"></div>
                </div>
              </div>

            </panel-item>
            <panel-item>
              <div class="flex flex-col md:flex-row justify-between md:items-center gap-y-3">
                <div class="ms-auto">
                  <fwb-button type="submit" :loading="loading" :disabled="loading || success">Odoslať správu</fwb-button>
                </div>
              </div>
            </panel-item>
          </panel-form>
        </div>

      </template>
    </container-grid>

  </Container>

  <Footer/>

</template>