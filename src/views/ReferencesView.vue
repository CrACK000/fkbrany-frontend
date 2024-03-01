<script setup lang='ts'>
import {ref, computed, onBeforeMount} from 'vue';
import {useMeta} from 'vue-meta';
import references from "@/plugins/references";
import Footer from "@/views/layout/Footer.vue";
import SkeletonReferences from "@/components/skeleton/references/SkeletonReferences.vue";
import ReferencesGrid from "@/components/references/ReferencesGrid.vue";
import Container from "@/components/Container.vue";

useMeta({ title: 'Galéria našej práce' });

const references_list = ref<Reference[]>(references.data.references);
const length = ref(9);

const loadMore = () => {
  if (length.value < references_list.value.length) {
    length.value += 9;
  }
}

const referencesLoaded = computed(() =>
  references_list.value.slice(0, length.value)
);

onBeforeMount(async () => {
  if (!references_list.value.length) {
    await references.all()
    references_list.value = references.data.references
  }
});
</script>

<template>

  <Container>
    <div class="text-3xl lg:text-4xl xl:text-5xl font-semibold text-gray-200 mb-8 md:mb-12">
      Galéria našej práce
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-10 lg:gap-14 xl:gap-20">
      <references-grid v-if="!references.data.referencesLoading" :references="referencesLoaded" />
      <skeleton-references v-else />
    </div>

    <div class="mt-16">
      <button @click="loadMore" class="flex items-center justify-center mx-auto gap-2.5 bg-gray-700/60 hover:bg-gray-700/75 transition px-6 py-4 leading-none rounded-2xl text-gray-300 hover:text-gray-200 focus:ring-4 focus:ring-offset-4 focus:ring-offset-gray-800 focus:ring-blue-600">
        Načítať ďalšie
        <i class="fa-solid fa-angles-down"></i>
      </button>
    </div>
  </Container>

  <Footer/>

</template>