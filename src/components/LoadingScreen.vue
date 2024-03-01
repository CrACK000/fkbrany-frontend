<script lang="ts">
import {defineComponent} from 'vue'
import Header from "@/components/Header.vue";
import {FwbSpinner} from "flowbite-vue";

export default defineComponent({
  name: "LoadingScreen",
  components: {FwbSpinner, Header}
})
</script>

<template>
  <Header>
    <fwb-spinner size="12" class="mx-auto my-auto"/>
  </Header>
</template>