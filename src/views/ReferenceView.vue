<script setup lang='ts'>
import {ref, onMounted, computed, watch, defineComponent} from 'vue';
import axios from 'axios';
import Footer from "@/views/layout/Footer.vue";
import {FwbCarousel} from "flowbite-vue";
import { useRoute } from 'vue-router';
import { useMeta } from 'vue-meta';
import SkeletonReference from "@/components/skeleton/references/SkeletonReference.vue";
import references from "@/plugins/references";
import Header from "@/components/Header.vue";
import Container from "@/components/Container.vue";

defineComponent({
  name: "ReferenceOdd"
})

watch(() => references.data.reference?.title, (newOfferValue) => {
  if (newOfferValue) {
    document.title = newOfferValue
  }
}, { immediate: true })

const route = useRoute();
const _id = ref(<string>route.params.id)
const reference = ref({} as Reference);
const gallery = ref<Image[]>([]);

const transformedGallery = computed(() => gallery.value.map(item => ({
  src: `${import.meta.env.VITE_BACKEND}/image/${item.path}`,
  alt: reference.value.title,
})));

onMounted(async () => {
  await references.view(_id.value)
  if (references.data.reference){
    reference.value = references.data.reference
    gallery.value = references.data.reference?.gallery ?? []
  }
});

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
      <fwb-carousel v-if="gallery.length" :pictures="transformedGallery" slide :slide-interval=5000 />
      <div v-else class="text-3xl text-gray-500">
        Galéria je nedostupná.
      </div>
    </div>

    <skeleton-reference v-else />

  </Container>

  <Footer/>

</template>