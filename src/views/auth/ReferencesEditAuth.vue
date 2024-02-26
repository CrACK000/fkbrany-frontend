<script setup lang="ts" xmlns="http://www.w3.org/1999/html">
import {useMeta} from "vue-meta";
import {FwbBadge, FwbButton, FwbInput, FwbSpinner, FwbTextarea} from "flowbite-vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import references from "@/plugins/references";
import {useRoute} from "vue-router";
import ImageLoading from "@/components/app/ImageLoading.vue";
import Spinner from "@/components/Spinner.vue";
import SkeletonAuthReferenceEditGalleryLoadingImage from "@/components/skeleton/auth/SkeletonGalleryLoadingImage.vue";
import PanelForm from "@/components/PanelForm.vue";
import PanelItem from "@/components/PanelItem.vue";
import router from "@/router";

useMeta({ title: `Upraviť referenciu` })

const route = useRoute();

const reference = ref<Reference>({} as Reference)
const imagesPreview = ref<any>([])

const form = ref<any>({
  title: '' as string,
  description: '' as string,
  files: Array<File>(),
  gallery: []
})

const _id = ref<string>(String(route.params.id))
const backend = ref(import.meta.env.VITE_BACKEND);
const max_files = ref<number>(8)

const loading = ref<boolean>(false)
const remove_loading = ref<number | null>(null)
const setMain_loading = ref<number | null>(null)
const removing_reference = ref<boolean>(false)
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

function editReference() {

  if (!checkForm()) return false

  loading.value = true

  const formData = new FormData();

  formData.append('title', form.value.title);
  formData.append('description', form.value.description);

  for(let file of form.value.files) {

    formData.append('files', file);

  }

  axios.post(`${import.meta.env.VITE_BACKEND}/references/edit/${_id.value}`, formData, { withCredentials: true })
    .then(response => {

      if (response.data.success) {

        reference.value.title = response.data.reference.title
        form.value.gallery = response.data.reference.gallery

        imagesPreview.value = []

        references.data.references = references.data.references.map((reference) => {

          if(reference._id === _id.value) {

            reference.title = response.data.reference.title;
            reference.description = response.data.reference.description;
            reference.gallery = response.data.reference.gallery;

          }

          return reference;

        });

        success.value = true
        success_message.value = response.data.message

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

function deleteImage(index: number) {

  remove_loading.value = index

  const removeImageData = {
    id: String(_id.value),
    key: String(index)
  }

  axios.post(`${import.meta.env.VITE_BACKEND}/references/remove/${_id.value}/image`, removeImageData, { withCredentials: true })
    .then(response => {

      if (response.data.success) {

        form.value.gallery = response.data.gallery;

        references.data.references = references.data.references.map((reference) => {

          if(reference._id === _id.value) {

            reference.gallery = response.data.gallery;

          }

          return reference;

        });

        success.value = true
        success_message.value = response.data.message

      } else {

        errors.value.push({ where: "main", message: response.data.message })

      }

    })
    .catch(error => {

      errors.value.push({ where: "main", message: "Server neodpovedá. Skúste to neskôr." })

    })
    .finally(() => {

      remove_loading.value = null

    })
}

function setMainImage(index: number) {

  setMain_loading.value = index

  const mainImageData = {
    id: String(_id.value),
    key: String(index)
  }

  axios.post(`${import.meta.env.VITE_BACKEND}/references/edit/${_id.value}/image`, mainImageData, { withCredentials: true })
    .then(response => {

      if (response.data.success) {

        form.value.gallery = response.data.gallery;

        references.data.references = references.data.references.map((reference) => {

          if(reference._id === _id.value) {

            reference.gallery = response.data.gallery;

          }

          return reference;

        });

        success.value = true
        success_message.value = response.data.message

      } else {

        errors.value.push({ where: "main", message: response.data.message })

      }

    })
    .catch(error => {

      errors.value.push({ where: "main", message: "Server neodpovedá. Skúste to neskôr." })

    })
    .finally(() => {

      setMain_loading.value = null

    })
}

function removeReference() {

  removing_reference.value = true

  const removeData = { id: String(_id.value) }

  axios.post(`${import.meta.env.VITE_BACKEND}/references/remove/${_id.value}`, removeData, { withCredentials: true })
    .then(response => {

      if (response.data.success) {

        references.data.references = references.data.references.filter((reference) => {

          return reference._id !== _id.value;

        })

        success.value = true
        success_message.value = response.data.message

        setTimeout(() => {
          router.push({ name: 'references-all' })
        }, 1000)

      } else {

        errors.value.push({ where: "main", message: response.data.message })

      }

    })
    .catch(error => {

      errors.value.push({ where: "main", message: "Server neodpovedá. Skúste to neskôr." })

    })
    .finally(() => {

      removing_reference.value = false

    })


}

function getError(search: any) {

  const emailError = errors.value.find((error: any) => error.where === search);
  return emailError ? emailError.message : '';

}

onMounted(async () => {

  await references.view(_id.value)

  if (references.data.reference){

    reference.value = references.data.reference
    form.value.title = references.data.reference.title
    form.value.description = references.data.reference.description
    form.value.gallery = references.data.reference.gallery
    max_files.value = max_files.value - form.value.gallery.length

  }

});

</script>

<template>
  <panel-form :submit="editReference" :keyup="checkForm">
    <panel-item>

      <div class="flex items-center gap-x-4">
        <button type="button" @click="$router.go(-1)" class="bg-gray-700 text-gray-400 shadow p-1 rounded-md opacity-75 hover:opacity-100 transition">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
          </svg>
        </button>
        <div class="text-sm md:text-base">
          Upraviť referenciu <span class="font-medium text-gray-300">{{ reference.title }}</span>
        </div>
        <div v-if="references.data.referenceLoading" class="ms-auto">
          <Spinner/>
        </div>
      </div>

    </panel-item>
    <panel-item>

      <div class="flex flex-col gap-y-4" :class="{'opacity-40 block-screen': references.data.referenceLoading }">
        <fwb-input v-model="form.title" :disabled="success" :validation-status="getError('title') && 'error'" type="text" label="Názov referencie" class="max-w-lg">
          <template #validationMessage>{{ getError('title') }}</template>
        </fwb-input>
        <fwb-textarea v-model="form.description" :disabled="success" label="Popis" class="max-w-lg" />
      </div>

    </panel-item>
    <panel-item>

      <div :class="{'opacity-40 block-screen': references.data.referenceLoading }">
        <div class="block mb-2 text-sm font-medium text-white">Galéria</div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-1.5 xs:gap-3">

          <div v-for="(img, key) in form.gallery" class="flex items-center justify-center aspect-video p-1.5 bg-gray-800 rounded-xl group relative" :key="key">

            <image-loading
              :src="`${backend}/image/${img.path}/426x240`"
              :alt="`Gallery img ${key}`"
              img-class="max-w-full max-h-full rounded-lg"
            >
              <template #skeleton>
                <skeleton-auth-reference-edit-gallery-loading-image />
              </template>
            </image-loading>

            <div class="absolute top-0 left-0 m-2" v-if="remove_loading === null">
              <fwb-badge v-if="img.main">Main</fwb-badge>
              <div v-else>
                <fwb-spinner v-if="setMain_loading === key" size="5"/>
                <fwb-button v-else type="button" @click="setMainImage(key)" color="alternative" size="xs" class="md:opacity-0 md:group-hover:opacity-100 transition">
                  Hlavný
                </fwb-button>
              </div>
            </div>

            <div class="absolute top-0 right-0 m-2">
              <fwb-spinner v-if="remove_loading === key" color="red" size="5"/>
              <button v-else type="button" @click="deleteImage(key)" class="bg-gray-800/15 backdrop-blur-lg p-0.5 hover:bg-red-500 hover:text-white hover:shadow rounded-md transition">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6m0 12L6 6"/>
                </svg>
              </button>
            </div>

          </div>

          <div v-if="imagesPreview.length" v-for="(file, key) in imagesPreview" class="flex items-center justify-center aspect-video p-1.5 bg-gray-800 rounded-xl relative" :key="key">

            <img :src="file" class="max-w-full max-h-full rounded-lg" :alt="`Preview img ${file}`">

            <fwb-badge class="absolute top-0 left-0 m-2" type="yellow">Náhľad</fwb-badge>

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
      </div>

    </panel-item>
    <panel-item>

      <div :class="{'opacity-40 block-screen': references.data.referenceLoading }">
        <div class="block mb-4 text-sm font-medium text-white">Nastavenia referencie</div>

        <div class="flex gap-x-3 items-center">
          <fwb-button type="button" @click="removeReference" :disabled="removing_reference" color="red">Odstrániť referenciu</fwb-button>
          <div v-if="removing_reference" class="flex items-center gap-x-2 text-red-500 text-sm">
            <fwb-spinner color="red"/>
            Odstraňuje sa...
          </div>
        </div>
        <div class="mt-2 text-sm text-red-500">
          Všetky informácie a galéria referencie budú odstránené. Táto akcia sa nedá vrátiť späť.
        </div>

      </div>

    </panel-item>
    <panel-item>

      <div class="flex flex-col md:flex-row justify-between md:items-center gap-y-3" :class="{'opacity-40 block-screen': references.data.referenceLoading }">
        <div>
          <span v-if="getError('main')" class="text-red-500">{{ getError('main') }}</span>
          <span v-if="success" class="text-emerald-500">{{ success_message }}</span>
        </div>
        <div>
          <fwb-button type="submit" :loading="loading" :disabled="loading || Boolean(errors.length)">Uložiť</fwb-button>
        </div>
      </div>

    </panel-item>
  </panel-form>
</template>