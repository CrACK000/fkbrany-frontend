<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'

interface Link {
  to: string;
  title: string;
}

const props = defineProps({
  links: {
    type: Array as PropType<Link[]>,
    required: true,
  },
})
</script>

<template>
  <div>
    <template v-for="link in props.links">
      <router-link :to="link.to" id="link" class="navbar-link">
        {{ link.title }}
      </router-link>
    </template>
  </div>
</template>