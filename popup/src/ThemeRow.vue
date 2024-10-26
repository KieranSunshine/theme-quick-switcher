<script setup lang="ts">
import type { Theme } from "./types.ts";
import { StarIcon } from "@heroicons/vue/20/solid";

defineProps<{
	theme: Theme;
}>();
</script>

<template>
	<div class="p-2 rounded truncate border-gray-300 bg-white flex gap-x-4" :title="theme.name">
		<span class="flex">{{ theme.name }}</span>
		<button type="button">
			<StarIcon class="size-5 fill-gray-300 hover:fill-yellow-400 hover:scale-105" />
		</button>
	</div>
</template>
