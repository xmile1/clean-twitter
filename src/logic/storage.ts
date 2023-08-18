import { useStorageLocal } from '~/composables/useStorageLocal'

interface LocalStorage {
  keywords: string[]
  showFloatingIcon: boolean
  showPlaceholderForHiddenTweet: boolean
  hideTwitterAds: boolean
  hidePeopleToFollowSuggestion: boolean
  hideSubscriptionSuggesstion: boolean
  showPlaceholderForHiddenAds: boolean
}

export const storageDemo = useStorageLocal<LocalStorage>('clean-twitter', {
  keywords: [],
  showFloatingIcon: true,
  showPlaceholderForHiddenTweet: false,
  hideTwitterAds: true,
  hidePeopleToFollowSuggestion: true,
  hideSubscriptionSuggesstion: true,
  showPlaceholderForHiddenAds: false,
})
