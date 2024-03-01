<script setup lang="ts">
import {useMeta} from "vue-meta";
import {FwbButton, FwbInput, FwbTextarea} from "flowbite-vue";
import Footer from "@/views/layout/Footer.vue";
import {ref} from "vue";
import axios from "axios";
import Container from "@/components/Container.vue";
import PanelForm from "@/components/PanelForm.vue";
import PanelItem from "@/components/PanelItem.vue";
import ImagesBeforeAfter from "@/components/panels/ImagesBeforeAfter.vue";
import ContainerHeader from "@/components/ContainerHeader.vue";
import ContainerGrid from "@/components/ContainerGrid.vue";

useMeta({ title: 'Renovácia brány' });

const form = ref<Renovation>({
  name: '' as string,
  email: '' as string,
  mobile: '' as string,
  widthGate: '' as string,
  heightGate: '' as string,
  msg: '' as string,
  pictures: [],
})
const imagesPreview = ref<any>([]);

const errors = ref<any>([])
const loading = ref<boolean>(false)
const success = ref<boolean>(false)
const fail = ref<boolean>(false)
const status = ref<string>('')
const MAX_FILES = 3;

const checkForm = () => {
  errors.value = [];
  validName()
  validEmail()
  validMobile()
  validWidthGate()
  validHeightGate()
  validMessage()
  if(!errors.value.length) return true;
}
const sendForm = () => {

  fail.value = false

  if (!checkForm()) return false

  loading.value = true

  let formFiles = new FormData();

  for(let i = 0; i < form.value.pictures.length; i++) {
    formFiles.append('pictures', form.value.pictures[i]);
  }

  formFiles.append('name', form.value.name)
  formFiles.append('email', form.value.email)
  formFiles.append('mobile', form.value.mobile)
  formFiles.append('widthGate', form.value.widthGate)
  formFiles.append('heightGate', form.value.heightGate)
  formFiles.append('msg', form.value.msg)

  axios.post(`${import.meta.env.VITE_BACKEND}/create-offer-renovation`, formFiles, { withCredentials: true })
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
const selectFiles = (e: any) => {
  if (e.target.files.length > MAX_FILES) {
    alert(`You can only select up to ${MAX_FILES} files.`);
    return;
  }
  form.value.pictures = e.target.files;
  createPreview(form.value.pictures)
}
const createPreview = (filesToPreview: any) => {
  imagesPreview.value = [];
  for(let i = 0; i < filesToPreview.length; i++) {
    imagesPreview.value.push(URL.createObjectURL(filesToPreview[i]));
  }
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
    errors.value.push({ where: "msg", message: "Napíšte poznámku k renovácii." });
  } else if (form.value.msg.length < 50) {
    errors.value.push({ where: "msg", message: "Správa musí obsahovať minimálne 50 znakov." });
  }
}
const validWidthGate = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'widthGate');
  if (!form.value.widthGate)
    errors.value.push({ where: "widthGate", message: "Zadajte šírku brány." });
}
const validHeightGate = () => {
  errors.value = errors.value.filter((error: any) => error.where !== 'heightGate');
  if (!form.value.heightGate)
    errors.value.push({ where: "heightGate", message: "Zadajte výšku brány." });
}

const getError = (search: any) => {
  const emailError = errors.value.find((error: any) => error.where === search);
  return emailError ? emailError.message : '';
}

</script>

<template>

  <Container>

    <container-header>
      <template #title>Renovácia Vašej starej brány</template>
      <template #description>
        Brána do vášho príbytku je vystavená slnku, mrazu, vetru, dažďu a všetkým poveternostným podmienkam
        ktorým musí odolávať. Ak máte poškodenú konštrukciu alebo lak na Vašej bráne, dôkladným
        opieskovaním a profesionálnym lakovaním vrátime späť jej krásu.
      </template>
    </container-header>

    <container-grid>

      <div class="lg:col-span-4">
        <images-before-after/>
      </div>

      <div class="lg:col-span-8">
        <div class="fk__form-card">
          <panel-form :submit="sendForm" :keyup="checkForm">
            <panel-item>
              <div class="text-lg sm:text-xl">Žiadosť o nacenenie renovácie brány</div>
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
                <fwb-input :validation-status="getError('name') && 'error'" @keyup="validName" v-model="form.name" label="Vaše meno a priezvisko" placeholder="Jozef Novák" size="lg" class="max-w-md">
                  <template #validationMessage>{{ getError('name') }}</template>
                </fwb-input>
                <fwb-input :validation-status="getError('email') && 'error'" @keyup="validEmail" v-model="form.email" label="Emailová adresa" placeholder="vas@email.com" size="lg" class="max-w-md">
                  <template #validationMessage>{{ getError('email') }}</template>
                </fwb-input>
                <fwb-input :validation-status="getError('mobile') && 'error'" @keyup="validMobile" v-model="form.mobile" label="Telefónne číslo" placeholder="+421" size="lg" class="max-w-md">
                  <template #validationMessage>{{ getError('mobile') }}</template>
                </fwb-input>
                <div class="grid grid-cols-2 gap-4">
                  <fwb-input :validation-status="getError('widthGate') && 'error'" @keyup="validWidthGate" v-model="form.widthGate" label="Šírka brány" placeholder="mm" size="lg">
                    <template #validationMessage>{{ getError('widthGate') }}</template>
                  </fwb-input>
                  <fwb-input :validation-status="getError('heightGate') && 'error'" @keyup="validHeightGate" v-model="form.heightGate" label="Výška brány" placeholder="mm" size="lg">
                    <template #validationMessage>{{ getError('heightGate') }}</template>
                  </fwb-input>
                </div>
                <div>
                  <fwb-textarea :rows="4" label="Poznámka" placeholder="Napíšte správu..." @keyup="validMessage" v-model="form.msg"></fwb-textarea>
                  <div v-if="getError('msg')" class="text-sm text-red-500 mt-2" v-text="getError('msg')"></div>
                </div>
                <div class="flex flex-col 2xl:flex-row justify-between items-center gap-3">

                  <div class="flex gap-3">
                    <label for="dropzone-file" class="rounded-lg hover:shadow-md text-gray-500 hover:text-gray-300 bg-gray-700 hover:bg-gray-600 transition cursor-pointer">
                      <div class="w-14 h-14 p-1 flex items-center justify-center relative">
                        <svg class="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M16 18H8l2.5-6 2 4 1.5-2 2 4Zm-1-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v4c0 .6-.4 1-1 1H5m14-4v16c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1ZM8 18h8l-2-4-1.5 2-2-4L8 18Zm7-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
                        </svg>
                        <div class="absolute right-0 top-0">
                          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                          </svg>
                        </div>
                      </div>
                      <input id="dropzone-file" type="file" multiple accept="image/*" name="files" v-on:change="selectFiles" class="hidden" />
                    </label>
                    <div v-for="(image, index) in imagesPreview" :key="index" class="w-14 h-14 aspect-square p-1 rounded-md bg-gray-700 flex justify-center items-center shadow">
                      <img :src="image" :alt="image" class="mw-full max-h-full rounded" />
                    </div>
                  </div>

                </div>
              </div>

            </panel-item>
            <panel-item>
              <div class="flex flex-col md:flex-row justify-between md:items-center gap-y-3">
                <div class="ms-auto">
                  <fwb-button type="submit" :loading="loading" :disabled="loading || success">Odoslať žiadosť</fwb-button>
                </div>
              </div>
            </panel-item>
          </panel-form>
        </div>
      </div>

    </container-grid>

  </Container>

  <Footer/>
</template>