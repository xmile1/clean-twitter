import { useStorageLocal } from "~/composables/useStorageLocal";

interface LocalStorage {
  keywords: [];
  showFloatingIcon: boolean;
  hideTweetCompletely: boolean;
  hideTwitterAds: boolean;
  hideTwitterSuggestions: boolean;
}

export const storageDemo = useStorageLocal<LocalStorage>("d-dat-o", {
  keywords: [],
  showFloatingIcon: true,
  hideTweetCompletely: false,
  hideTwitterAds: false,
  hideTwitterSuggestions: false,
});
