<script setup lang="ts">
import {useMeta} from "vue-meta";
import {FwbButton, FwbInput, FwbTextarea} from "flowbite-vue";
import {ref} from "vue";
import axios from "axios";
import router from "@/router";
import references from "@/plugins/references";
import PanelForm from "@/components/PanelForm.vue";
import PanelItem from "@/components/PanelItem.vue";

useMeta({ title: "Vytvoriť referenciu" })

const max_files = ref<number>(8)
const imagesPreview = ref<any>([])

const form = ref<any>({
  title: '' as string,
  description: '' as string,
  files: Array<File>()
})

const loading = ref<boolean>(false)
const errors = ref<any>([])
const success = ref<boolean>(false)
const success_message = ref<string>('')

const selectFiles = (e: any) => {
  if (e.target.files.length > max_files.value) {
    alert(`Môžete vybrať maximálne ${max_files.value} súbory.`);
    return;
  }
  form.value.files = Array.from(e.target.files);
  createPreview(form.value.files)
}
const createPreview = (filesToPreview: any) => {
  imagesPreview.value = [];
  for(let i = 0; i < filesToPreview.length; i++) {
    imagesPreview.value.push(URL.createObjectURL(filesToPreview[i]));
  }
}
const deletePreview = (index: number) => {
  imagesPreview.value.splice(index, 1);

  const filesArray = form.value.files;
  filesArray.splice(index, 1);

  form.value.files = filesArray;
}

function checkForm() {
  errors.value = []

  if (!form.value.title) errors.value.push({ where: "title", message: "Vyplňte názov referencie." })

  return !errors.value.length;

}

function createReference() {

  if (!checkForm()) return false

  loading.value = true

  const formData = new FormData();

  formData.append('title', form.value.title);
  formData.append('description', form.value.description);

  for(let file of form.value.files) {

    formData.append('files', file);

  }

  axios.post(`${import.meta.env.VITE_BACKEND}/references/create`, formData, { withCredentials: true })
    .then(response => {

      if (response.data.success) {

        success.value = true
        success_message.value = response.data.message

        references.data.references.unshift(response.data.reference);

        setTimeout(() => {
          router.push({ name: 'references-all' })
        }, 3000);

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
  <panel-form :submit="createReference" :keyup="checkForm">
    <panel-item>
      <div class="flex items-center gap-x-4">
        <button type="button" @click="$router.go(-1)" class="bg-gray-700 text-gray-400 shadow p-1 rounded-md opacity-75 hover:opacity-100 transition">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
          </svg>
        </button>
        Vytvoriť novú referenciu
      </div>
    </panel-item>
    <panel-item>
      <div class="flex flex-col gap-y-4 max-w-lg">
        <fwb-input v-model="form.title" :validation-status="getError('title') && 'error'" type="text" label="Názov referencie">
          <template #validationMessage>{{ getError('title') }}</template>
        </fwb-input>
        <fwb-textarea v-model="form.description" label="Popis" />
      </div>
    </panel-item>
    <panel-item>
      <div class="block mb-2 text-sm font-medium text-white">Galéria</div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-1.5 xs:gap-3">

        <div v-if="imagesPreview.length" v-for="(file, key) in imagesPreview" class="flex items-center justify-center aspect-video p-1.5 bg-gray-800 rounded-xl relative" :key="key">

          <img :src="file" class="max-w-full max-h-full rounded-lg" :alt="file">
          <button type="button" @click="deletePreview(key)" class="absolute bg-gray-800/15 backdrop-blur-lg p-0.5 top-0 right-0 m-2 hover:bg-red-500 hover:text-white hover:shadow rounded-md transition">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6m0 12L6 6"/>
            </svg>
          </button>

        </div>

        <label class="group flex items-center justify-center gap-x-1.5 aspect-video p-1.5 bg-black/20 hover:bg-black/25 border border-gray-800 rounded-xl cursor-pointer text-gray-500 hover:text-gray-400 transition">
          <svg class="w-6 h-6 xs:w-8 xs:h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M9 7V2.2a2 2 0 0 0-.5.4l-4 3.9a2 2 0 0 0-.3.5H9Zm2 0V2h7a2 2 0 0 1 2 2v6.4A7.5 7.5 0 1 0 10.5 22H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M9 16a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm6-3c.6 0 1 .4 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1c0-.6.4-1 1-1Z" clip-rule="evenodd"/>
          </svg>
          <span class="text-sm xs:text-base">Nahrať</span>
          <input type="file" @change="selectFiles" multiple hidden accept="image/*" />
        </label>

      </div>
    </panel-item>
    <panel-item>
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-y-3">
        <div>
          <span v-if="getError('main')" class="text-red-500">{{ getError('main') }}</span>
          <span v-if="success" class="text-emerald-500">{{ success_message }}</span>
        </div>
        <div>
          <fwb-button type="submit" :loading="loading" :disabled="loading || Boolean(errors.length) || success">Vytvoriť</fwb-button>
        </div>
      </div>
    </panel-item>
  </panel-form>
</template>