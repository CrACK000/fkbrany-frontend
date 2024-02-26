<script setup lang="ts">
import {useMeta} from "vue-meta";
import PanelItem from "@/components/PanelItem.vue";
import Panel from "@/components/Panel.vue";
import SettingsPassword from "@/components/auth/SettingsPassword.vue";
import SettingsWeb from "@/components/auth/SettingsWeb.vue";

useMeta({ title: "Nastavenia" })
</script>

<template>
  <panel>
    <panel-item>
      <settings-web/>
    </panel-item>
    <panel-item>
      <settings-password/>
    </panel-item>
  </panel>
</template>