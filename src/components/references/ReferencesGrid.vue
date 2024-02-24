<script setup lang="ts">
import {type PropType, ref} from "vue";
import ImageLoading from "@/components/app/ImageLoading.vue";
import ReferenceNoGallery from "@/components/references/ReferenceNoGallery.vue";
import SkeletonReferences from "@/components/skeleton/references/SkeletonReferences.vue";

const props = defineProps({
  references: {
    required: true,
    type: Array as PropType<Reference[]>,
  }
})

const backend = ref(import.meta.env.VITE_BACKEND);

</script>

<template>
  <template v-for="reference in props.references">
    <router-link :to="{ name: 'reference', params: { id: reference._id } }" class="relative aspect-video group scale-100 hover:scale-110 transition-all rounded-2xl overflow-hidden hover:ring-[14px] hover:ring-gray-700/30">
      <div>
        <image-loading
          v-if="reference.gallery.length"
          :src="`${backend}/image/${(reference.gallery.find(img => img.main) || reference.gallery[0]).path}`"
          img-class="w-full z-10 rounded-lg xs:rounded-xl sm:rounded-2xl shadow-xl shadow-black/25"
          :alt="reference.title"
        >
          <template #skeleton>
            <skeleton-references :rows=1 />
          </template>
        </image-loading>
        <reference-no-gallery v-else />
        <div class="bg-gray-700/70 p-4 text-gray-50 font-medium absolute bottom-0 transform translate-y-full group-hover:translate-y-0 transition-all duration-200 z-0 w-full rounded-b-2xl -mt-7 truncate">
          {{ reference.title }}
        </div>
      </div>
    </router-link>
  </template>
</template>