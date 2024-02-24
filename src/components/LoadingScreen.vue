<script lang="ts">
import {defineComponent} from 'vue'
import Spinner from "@/components/Spinner.vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "LoadingScreen",
  components: {Header, Spinner}
})
</script>

<template>
  <Header>
    <Spinner :width=12 :height=12 class="mx-auto my-auto" />
  </Header>
</template>