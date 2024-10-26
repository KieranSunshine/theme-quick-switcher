<script setup lang="ts">
import { useActiveTheme } from "./composables/useActiveTheme.ts";
import ThemeRow from "./ThemeRow.vue";
import { useFavouritedThemesStore } from "./stores/useFavouritedThemesStore.ts";
import { computed } from "vue";

const store = useFavouritedThemesStore();
const { active } = useActiveTheme();

const favourites = computed(() => store.favourites.filter((f) => f.id !== active.value?.id));
</script>

<template>
	<div class="bg-gray-200 p-2 h-40">
		<template v-if="active">
			<div class="mb-3">
				<p class="mb-1">Active Theme:</p>
				<ThemeRow :theme="active" />
			</div>
		</template>

		<template v-if="favourites.length > 0">
			<div>
				<p>Favourited Themes:</p>
				<ThemeRow v-for="fav in favourites" :key="fav.id" :theme="fav" />
			</div>
		</template>
	</div>
</template>
