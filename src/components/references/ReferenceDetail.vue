<script lang="ts">
import {defineComponent} from 'vue'
import {FwbCarousel} from "flowbite-vue";
import SkeletonReference from "@/components/skeleton/references/SkeletonReference.vue";
import references from "@/plugins/references";

export default defineComponent({
  name: "ReferenceDetail",
  computed: {
    references() {
      return references
    }
  },
  components: {SkeletonReference, FwbCarousel}
})
</script>

<template>
  <div v-if="!references.data.referenceLoading">
    <div class="mb-14">
      <div class="text-gray-200 text-4xl lg:text-5xl font-semibold mb-10" v-text="reference.title"></div>
      <div class="text-gray-500 lg:text-xl max-w-4xl" v-html="reference.description"></div>
    </div>
    <fwb-carousel v-if="gallery.length" :pictures="transformedGallery" slide :slide-interval=5000 />
    <div v-else class="text-3xl text-gray-500">
      Galéria je nedostupná.
    </div>
  </div>

  <skeleton-reference v-else />
</template>