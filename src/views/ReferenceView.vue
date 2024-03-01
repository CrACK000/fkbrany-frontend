<script setup lang='ts'>
import {ref, watch, onBeforeMount} from 'vue';
import Footer from "@/views/layout/Footer.vue";
import { useRoute } from 'vue-router';
import SkeletonReference from "@/components/skeleton/references/SkeletonReference.vue";
import references from "@/plugins/references";
import Container from "@/components/Container.vue";
import Cookies from 'js-cookie'
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ImageLoading from "@/components/ImageLoading.vue";
import SkeletonReferenceGallery from "@/components/skeleton/references/SkeletonReferenceGallery.vue";

watch(() => references.data.reference?.title, (newOfferValue) => {
  if (newOfferValue) {
    document.title = newOfferValue
  }
}, { immediate: true })

const route = useRoute();
const _id = ref(<string>route.params.id)
const reference = ref({} as Reference);
const gallery = ref<Image[]>([]);
const backend = import.meta.env.VITE_BACKEND

async function counterViews() {
  let get = Cookies.get(String(_id.value))
  if (!get) {
    await axios.post(`${import.meta.env.VITE_BACKEND}/references/counter`, { id: _id.value }, { withCredentials: true })
      .then(response => {
        Cookies.set(String(_id.value), 'seen', { expires: 10/1440 }) // 10 min.
      })
      .catch(error => {
        console.log('Counter does not work.')
      })
  }
}

onBeforeMount(async () => {
  await references.view(_id.value)
  await counterViews()
  if (references.data.reference){
    reference.value = references.data.reference
    gallery.value = references.data.reference?.gallery ?? []
  }
});

const modules = [Navigation]

</script>

<template>

  <Container>

    <div v-if="!references.data.referenceLoading">
      <div class="mb-14">
        <div class="flex flex-col xl:flex-row gap-6 xl:items-center mb-10">
          <div>
            <button type="button" @click="$router.go(-1)" class="bg-gray-700 text-gray-400 shadow p-1 rounded-lg opacity-75 hover:opacity-100 transition">
              <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
              </svg>
            </button>
          </div>
          <div class="text-gray-200 text-4xl lg:text-5xl font-semibold" v-text="reference.title"></div>
        </div>
        <div class="text-gray-500 lg:text-xl max-w-4xl" v-html="reference.description"></div>
      </div>
    </div>
    <skeleton-reference v-else />

  </Container>

  <template v-if="!references.data.referenceLoading">
    <swiper v-if="gallery.length" :navigation="true" :modules="modules" class="w-full">
      <swiper-slide v-for="img in gallery">
        <ImageLoading :src="`${backend}/image/${img.path}/1920x1080`" :alt="reference.title" img-class="aspect-video w-full">
          <template #skeleton>
            <SkeletonReferenceGallery/>
          </template>
        </ImageLoading>
      </swiper-slide>
    </swiper>
    <Container v-else class="text-3xl text-gray-500">
      Galéria je nedostupná.
    </Container>
  </template>
  <SkeletonReferenceGallery v-else />

  <Footer/>

</template>