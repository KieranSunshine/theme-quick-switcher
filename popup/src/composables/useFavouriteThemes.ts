import type { Theme } from "@/types";
import { onBeforeMount, readonly, ref } from "vue";
import { z } from "zod";

const FAV_THEMES_KEY = "fav_themes" as const;

const schema = z.object({
	favourites: z
		.object({
			id: z.string(),
			name: z.string(),
		})
		.array(),
});

export function useFavouriteThemes() {
	const favourites = ref<Array<Theme>>([]);

	onBeforeMount(async () => {
		favourites.value = (await getFavouriteThemesOrDefault()).favourites;
	});

	function favourite(theme: Theme) {}

	return {
		favourites: readonly(favourites),
	};
}

async function getFavouriteThemesOrDefault(): Promise<z.infer<typeof schema>> {
	const data = await chrome.storage.sync.get(FAV_THEMES_KEY);

	const result = schema.safeParse(data);
	if (result.success) {
		return result.data;
	}

	return {
		favourites: [],
	};
}
