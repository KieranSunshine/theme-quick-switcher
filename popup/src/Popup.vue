<script setup lang="ts">
import { useActiveTheme } from "./composables/useActiveTheme.ts";
import ThemeRow from "./ThemeRow.vue";

const { active } = useActiveTheme();
</script>

<template>
  <div class="bg-gray-200 p-2 h-40">
    <template v-if="active">
      <p>Active Theme:</p>
      <ThemeRow :theme="active" class="min-w-52" />
    </template>
  </div>
</template>
