import { useStorageLocal } from '~/composables/useStorageLocal'

interface LocalStorage {
  keywords: string[]
  showFloatingIcon: boolean
  hideTweetCompletely: boolean
  hideTwitterAds: boolean
  hideTwitterSuggestions: boolean
}

export const storageDemo = useStorageLocal<LocalStorage>('clean-twitter', {
  keywords: [],
  showFloatingIcon: true,
  hideTweetCompletely: false,
  hideTwitterAds: false,
  hideTwitterSuggestions: false,
})
