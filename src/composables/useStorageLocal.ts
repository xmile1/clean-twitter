import type {
  MaybeRef,
  RemovableRef,
  StorageLikeAsync,
  UseStorageAsyncOptions,
} from '@vueuse/core'
import { useStorageAsync } from '@vueuse/core'
import { storage } from 'webextension-polyfill'

const storageLocal: StorageLikeAsync = {
  removeItem(key: string) {
    return storage.local.remove(key)
  },

  setItem(key: string, value: string) {
    return storage.local.set({ [key]: value })
  },

  async getItem(key: string) {
    return (await storage.local.get(key))[key]
  },
}

export const useStorageLocal = <T>(
  key: string,
  initialValue: MaybeRef<T>,
  options?: UseStorageAsyncOptions<T>,
): RemovableRef<T> => {
  const store = useStorageAsync(key, initialValue, storageLocal, options)

  // useStorageLocal in the content script is not reactive to changes in the store triggered in the Popup
  // so we use this inform the content scripts storageLocal that there was a change
  storage.onChanged.addListener((changes) => {
    if (changes[key])
      store.value = JSON.parse(changes[key].newValue)
  })

  return store
}
