<script setup lang='ts'>
import {ref, onBeforeMount} from 'vue';
import references from "@/plugins/references";
import SkeletonLatestReferences from "@/components/skeleton/references/SkeletonLatestReferences.vue";
import ImageLoading from "@/components/ImageLoading.vue";
import LatestReferencesNoGallery from "@/components/references/LatestReferencesNoGallery.vue";

const length = ref(6);
const references_list = ref<Reference[]>(references.data.references.slice(0,length.value));
const backend = ref(import.meta.env.VITE_BACKEND);

onBeforeMount(async () => {
  if (!references_list.value.length) {
    await references.all()
    references_list.value = references.data.references.slice(0,length.value)
  }
});
</script>

<template>
  <div class="flex flex-col gap-y-16 py-24">

    <div class="text-center">
      <div class="text-4xl font-semibold text-gray-200">
        Naše najnovšie práce
      </div>
      <div class="mt-4 opacity-75 text-gray-400 max-w-2xl mx-auto">
        Vybrať si môžete zo širokej škály dizajnových vyplní, od rôznych horizontálne uložených jaklových
        profilov cez lamely, ťahokov, atď.. Neváhaj nás kontaktovať.
      </div>
    </div>

    <div>
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 shadow-xl">

          <router-link
            v-if="!references.data.referencesLoading"
            :to="{ name: 'reference', params: { id: reference._id } }"
            v-for="reference in references_list"
            class="relative aspect-video group transition z-10 hover:z-50 lg:opacity-90 lg:hover:opacity-100">

            <image-loading
              v-if="reference.gallery.length"
              :src="`${backend}/image/${(reference.gallery.find(img => img.main) || reference.gallery[0]).path}/640x360`"
              img-class="w-full h-full lg:scale-100 lg:group-hover:scale-110 lg:group-hover:shadow-xl transition"
              :alt="reference.title">
              <template #skeleton>
                <skeleton-latest-references :rows=1 />
              </template>
            </image-loading>

            <latest-references-no-gallery v-else />

            <div class="absolute inset-0 lg:opacity-0 lg:group-hover:opacity-100 lg:scale-100 lg:group-hover:scale-110 transition">
              <div class="text-gray-200 line-clamp-2 bg-gray-700/30 backdrop-blur-lg shadow-xl p-3 truncate">
                {{reference.title}}
              </div>
            </div>

          </router-link>

          <skeleton-latest-references v-else />

        </div>
      </div>
    </div>

  </div>
</template>