import { defineStore } from "pinia";
import type { Theme } from "@/types";
import { onBeforeMount, readonly, triggerRef, shallowRef } from "vue";
import { z } from "zod";

const FAV_THEMES_KEY = "fav_themes" as const;

const schema = z
	.object({
		id: z.string(),
		name: z.string(),
	})
	.array();

export const useFavouritedThemesStore = defineStore("favourite-themes", () => {
	const favourites = shallowRef<Array<Theme>>([]);

	onBeforeMount(async () => {
		favourites.value = await getFavouriteThemesOrDefault();
		console.log(favourites.value);
	});

	async function favourite(theme: Theme) {
		const exists = favourites.value.find((t) => t.id === theme.id);
		if (exists) return;

		favourites.value.push(theme);
		triggerRef(favourites);

		await writeFavouriteThemesToStorage(favourites.value);
	}

	async function unfavourite(theme: Theme) {
		const index = favourites.value.findIndex((t) => t.id === theme.id);
		if (index === -1) return;

		favourites.value.splice(index, 1);
		triggerRef(favourites);

		await writeFavouriteThemesToStorage(favourites.value);
	}

	function isFavourited(theme: Theme) {
		const result = favourites.value.some((t) => t.id === theme.id);
		return result;
	}

	return {
		favourites: readonly(favourites),

		isFavourited,
		favourite,
		unfavourite,
	};
});

async function getFavouriteThemesOrDefault(): Promise<z.infer<typeof schema>> {
	const data = (await chrome.storage.local.get(FAV_THEMES_KEY))[FAV_THEMES_KEY];

	const result = schema.safeParse(data);
	if (result.success) {
		return result.data;
	}

	return [];
}

async function writeFavouriteThemesToStorage(favourites: Array<Theme>) {
	const data: z.infer<typeof schema> = favourites.map((f) => ({
		id: f.id,
		name: f.name,
	}));

	await chrome.storage.local.set({
		[FAV_THEMES_KEY]: data,
	});
}
