import { useStorageLocal } from '~/composables/useStorageLocal'

interface LocalStorage {
  keywords: string[]
  showFloatingIcon: boolean
  hideTweetCompletely: boolean
  hideTwitterAds: boolean
  hidePeopleToFollowSuggestion: boolean
  hideSubscriptionSuggesstion: boolean
  hideTwitterAdsCompletely: boolean
}

export const storageDemo = useStorageLocal<LocalStorage>('clean-twitter', {
  keywords: [],
  showFloatingIcon: true,
  hideTweetCompletely: false,
  hideTwitterAds: false,
  hidePeopleToFollowSuggestion: false,
  hideSubscriptionSuggesstion: false,
  hideTwitterAdsCompletely: false,
})
