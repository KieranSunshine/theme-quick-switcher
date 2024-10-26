<script setup lang="ts">
import type { Theme } from "./types.ts";
import { StarIcon } from "@heroicons/vue/20/solid";
import { useFavouritedThemesStore } from "./stores/useFavouritedThemesStore.ts";

const { theme } = defineProps<{
	theme: Theme;
}>();

const store = useFavouritedThemesStore();

async function onStarClicked() {
	if (store.isFavourited(theme)) await store.unfavourite(theme);
	else await store.favourite(theme);
}
</script>

<template>
	<div class="p-2 rounded truncate border-gray-300 bg-white flex gap-x-4" :title="theme.name">
		<span class="flex grow">{{ theme.name }}</span>
		<button type="button" @click="onStarClicked">
			<StarIcon
				class="size-5 hover:scale-105"
				:class="[
					store.isFavourited(theme) ? 'fill-yellow-400' : 'fill-gray-300 hover:fill-yellow-400',
				]"
			/>
		</button>
	</div>
</template>
