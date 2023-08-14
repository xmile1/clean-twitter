import type { TweetProcessor } from './processTweet'

export const hideTweetWithKeyword: TweetProcessor = {
  run(element: HTMLElement, { keywords, hideTweetCompletely }) {
    const tweetText = element.querySelector('[data-testid="tweetText"]')?.innerText
    const tweetHasKeyword = tweetText && keywords.some((keyword: string) => keyword && tweetText?.toLowerCase().includes(keyword.toLowerCase()))

    if (tweetHasKeyword) {
      const nextSibling = element.nextSibling as HTMLElement | null

      element.style.height = hideTweetCompletely ? '0px' : '30px'
      element.style.overflow = 'hidden'

      if (nextSibling?.textContent === 'Show replies') {
        nextSibling.style.height = '0px'
        nextSibling.style.overflow = 'hidden'
      }

      const hiddenTweet = document.createElement('div')
      hiddenTweet.innerText = 'Tweet hidden because it contains a keyword (Click to view tweet)'
      hiddenTweet.style.color = 'grey'
      hiddenTweet.style.padding = '8px 8px 8px 32px'
      hiddenTweet.style.fontFamily = 'TwitterChirp'
      hiddenTweet.style.cursor = 'pointer'
      //  on click, remove style height and remove hiddenTweet

      hiddenTweet.addEventListener('click', () => {
        element.style.height = 'unset'
        element.style.overflow = 'unset'
        if (nextSibling?.textContent === 'Show replies') {
          nextSibling.style.height = 'unset'
          nextSibling.style.overflow = 'unset'
        }
        hiddenTweet.remove()
      });
      (element as Element).prepend(hiddenTweet)
    }
  },
}
