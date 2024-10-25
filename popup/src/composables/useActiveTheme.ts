import type { Theme } from "@/types.ts";
import { onBeforeMount, readonly, ref } from "vue";

export function useActiveTheme() {
  const active = ref<Theme>();

  onBeforeMount(async () => {
    const extensions = await chrome.management.getAll();

    const theme = extensions.find(
      (ext) => ext.type === "theme" && ext.enabled && ext
    );
    if (theme === undefined) return;

    active.value = {
      id: theme.id,
      name: theme.name,
    };
  });

  return {
    active: readonly(active),
  };
}
