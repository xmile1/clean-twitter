import type { TweetProcessor } from './processTweet'
import { hideTweet } from './hideTweet'

export const hideTweetWithKeyword: TweetProcessor = {
  run(element: HTMLElement, { keywords, showPlaceholderForHiddenTweet }) {
    const tweetText = element.querySelector('[data-testid="tweetText"]')?.innerText
    const tweetHasKeyword
      = tweetText
      && keywords.some(
        (keyword: string) => keyword && tweetText?.toLowerCase().includes(keyword.toLowerCase()),
      )

    if (tweetHasKeyword) {
      hideTweet(element, showPlaceholderForHiddenTweet, 'Tweet with keyword')
      return true
    }
    return false
  },
}

export const hideTwitterAds: TweetProcessor = {
  run(element: HTMLElement, { hideTwitterAds, showPlaceholderForHiddenAds }) {
    const isAnAd = element.querySelector('[data-testid="tweet"]')?.innerHTML.includes('>Ad</')
    if (isAnAd && hideTwitterAds) {
      hideTweet(element, showPlaceholderForHiddenAds, 'Ad')
      return true
    }
    return false
  },
}

export const hidePeopleToFollowSuggestion: TweetProcessor = {
  run(element: HTMLElement, { hidePeopleToFollowSuggestion, showPlaceholderForHiddenAds }) {
    if (!hidePeopleToFollowSuggestion)
      return true

    const hasPeopleToFollow = (node: HTMLElement) => {
      return (
        node?.querySelector('[data-testid$="follow"]')
        && node?.querySelector('[data-testid="UserCell"]')
      )
    }

    const hidePeopleToFollowTitleAndSeeMore = (node: HTMLElement) => {
      const nextSibling = node.nextSibling as HTMLElement
      const previousSibling = node.previousSibling as HTMLElement | null
      const previousTwoSibling = node.previousSibling?.previousSibling as HTMLElement | null
      const previousThreeSiblings = node.previousSibling?.previousSibling?.previousSibling as HTMLElement

      const connectPeopleLink = nextSibling?.querySelector(
        'a[href^=\'/i/connect_people?user_id=\']',
      )

      if (previousSibling && previousTwoSibling && connectPeopleLink) {
        hideTweet(previousThreeSiblings, showPlaceholderForHiddenAds, 'People to follow title')
        hideTweet(nextSibling, showPlaceholderForHiddenAds, 'See more link')
      }
    }

    if (hasPeopleToFollow(element)) {
      hideTweet(element, showPlaceholderForHiddenAds, 'People to follow')
      hidePeopleToFollowTitleAndSeeMore(element)
      return true
    }

    const peopleToFollowSvg
      = 'M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z'

    const tweetText = element.querySelector('[data-testid="tweetText"]')?.innerText
    const tweetPhoto = element.querySelector('[data-testid="tweetPhoto"]')?.innerHTML
    if (element.innerHTML.includes(peopleToFollowSvg) && !(tweetText || tweetPhoto)) {
      hideTweet(element, showPlaceholderForHiddenAds, 'People to follow')
      return true
    }

    return false
  },
}

export const hideSubscriptionSuggesstion: TweetProcessor = {
  run(element: HTMLElement, { hideSubscriptionSuggesstion, showPlaceholderForHiddenAds }) {
    if (
      hideSubscriptionSuggesstion
      && element.querySelector('[data-testid$="subscribe"]')
      && element.querySelector('[data-testid="UserCell"]')
    ) {
      hideTweet(element, showPlaceholderForHiddenAds, 'Subcribe suggestion')
      return true
    }
    return false
  },
}
