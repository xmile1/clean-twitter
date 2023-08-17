const createHiddenTweetElement = () => {
  const hiddenTweet = document.createElement('div')
  hiddenTweet.innerText = 'Tweet hidden because it contains a keyword (Click to view tweet)'
  hiddenTweet.style.color = 'grey'
  hiddenTweet.style.padding = '8px 8px 8px 32px'
  hiddenTweet.style.fontFamily = 'TwitterChirp'
  hiddenTweet.style.cursor = 'pointer'
  return hiddenTweet
}

const showTweet = (element: HTMLElement, nextSibling: HTMLElement | null) => {
  element.style.height = 'unset'
  element.style.overflow = 'unset'
  if (nextSibling?.textContent === 'Show replies') {
    nextSibling.style.height = 'unset'
    nextSibling.style.overflow = 'unset'
  }
}

export const hideTweet = (element: HTMLElement, hideTweetCompletely: boolean) => {
  const nextSibling = element.nextSibling as HTMLElement | null

  element.style.height = hideTweetCompletely ? '0px' : '30px'
  element.style.overflow = 'hidden'

  if (nextSibling?.textContent === 'Show replies') {
    nextSibling.style.height = '0px'
    nextSibling.style.overflow = 'hidden'
  }

  const hiddenTweet = createHiddenTweetElement()

  hiddenTweet.addEventListener('click', () => {
    showTweet(element, nextSibling)
    hiddenTweet.remove()
  })

  element.prepend(hiddenTweet)
}
