import type {
  MaybeRef,
  RemovableRef,
  StorageLikeAsync,
  UseStorageAsyncOptions,
} from "@vueuse/core";
import { useStorageAsync } from "@vueuse/core";
import { storage } from "webextension-polyfill";

const storageLocal: StorageLikeAsync = {
  removeItem(key: string) {
    return storage.local.remove(key);
  },

  setItem(key: string, value: string) {
    console.log(key, value, "keyvalue");
    return storage.local.set({ [key]: value });
  },

  async getItem(key: string) {
    return (await chrome.storage.local.get(key))[key];
  },
};

export const useStorageLocal = <T>(
  key: string,
  initialValue: MaybeRef<T>,
  options?: UseStorageAsyncOptions<T>
): RemovableRef<T> => {
  const store = useStorageAsync(key, initialValue, storageLocal, options);
  storage.onChanged.addListener((changes) => {
    // check the type of changes[key].newValue and parse accordingly

    if (changes[key]) store.value = JSON.parse(changes[key].newValue);
  });

  return store;
};
