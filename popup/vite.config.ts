import { fileURLToPath, URL } from "node:url";
import type { UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default {
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	base: "./",
} satisfies UserConfig;
