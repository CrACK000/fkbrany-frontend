<script setup lang="ts">
import {useMeta} from "vue-meta";
import {FwbButton} from "flowbite-vue";
import {computed, onMounted, ref} from "vue";
import references from "@/plugins/references";
import {timeSince} from "@/plugins/dates";
import ImageLoading from "@/components/app/ImageLoading.vue";
import SkeletonLoadingImagesAuthReferences from "@/components/skeleton/auth/SkeletonLoadingImagesAuthReferences.vue";
import ReferenceNoGallery from "@/components/references/ReferenceNoGallery.vue";
import SkeletonAuthReferences from "@/components/skeleton/auth/SkeletonAuthReferences.vue";

useMeta({ title: "Referencie" })

const references_list = ref<Reference[]>(references.data.references);
const length = ref(9);
const backend = ref(import.meta.env.VITE_BACKEND);

const referencesLoaded = computed(() =>
  references_list.value.slice(0, length.value)
);

onMounted(async () => {
  if (!references_list.value.length) {
    await references.all()
    references_list.value = references.data.references
  }
});

</script>

<template>
  <div class="px-2 xxs:px-3 xs:px-4 md:px-6 py-6 text-gray-400 dark">
    <div class="flex items-center justify-between mb-6">
      <div>Všetky referencie</div>
      <router-link :to="{ name: 'references-create' }">
        <fwb-button type="button" size="sm">Vytvoriť novú</fwb-button>
      </router-link>
    </div>

    <div class="flex flex-col gap-y-3">

      <div v-if="!references.data.referencesLoading" v-for="reference in referencesLoaded" class="grid grid-cols-12 gap-4 bg-black/15 lg:bg-black/0 lg:hover:bg-black/15 lg:scale-100 lg:hover:scale-105 p-3 rounded-lg xs:rounded-xl md:rounded-2xl lg:rounded-3xl xl:rounded-[2rem] transition">

        <div class="col-span-12 md:col-span-4 self-center aspect-video">

          <image-loading
            v-if="reference.gallery.length"
            :src="`${backend}/image/${(reference.gallery.find(img => img.main) || reference.gallery[0]).path}`"
            img-class="rounded-md xs:rounded-lg md:rounded-xl lg:rounded-2xl xl:rounded-3xl max-w-full max-h-full mx-auto"
            :alt="reference.title"
          >
            <template #skeleton>
              <skeleton-loading-images-auth-references/>
            </template>
          </image-loading>

          <reference-no-gallery v-else />

        </div>

        <div class="col-span-12 md:col-span-8 flex flex-col justify-between gap-y-3">
          <div class="flex justify-between">
            <div>
              <div class="text-lg md:text-xl max-w-full line-clamp-1">{{ reference.title }} asda sdasd asd</div>
              <div class="line-clamp-2 text-sm mt-1 md:mt-2 opacity-75 max-w-md">{{ reference.description }}</div>
            </div>
            <div class="hidden md:block">
              <router-link :to="{ name: 'reference', params: { id: reference._id } }">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"/>
                </svg>
              </router-link>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="text-xs md:text-sm">
              Pridané {{ timeSince(reference.created_at) }}
            </div>
            <div class="flex items-center gap-x-3">
              <div class="flex items-center gap-1 text-xs">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"/>
                  <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg> {{ reference.views ?? 0 }}
              </div>
              <router-link :to="{ name: 'references-edit', params: { id: reference._id } }">
                <fwb-button type="button" size="xs" color="alternative">Upraviť</fwb-button>
              </router-link>
            </div>
          </div>
        </div>

      </div>

      <skeleton-auth-references v-else />

    </div>

  </div>
</template>