const createHiddenTweetElement = (typeOfTweet: string) => {
  const hiddenTweet = document.createElement('div')
  hiddenTweet.innerText = `${typeOfTweet} hidden by Clean Twitter. (Click to view tweet)`
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

export const hideTweet = (element: HTMLElement, showPlaceholderForHiddenTweet: boolean, typeOfTweet: string) => {
  const nextSibling = element.nextSibling as HTMLElement | null
  if (element.style.height === '30px' || element.style.height === '0px')
    return

  element.style.height = showPlaceholderForHiddenTweet ? '30px' : '0px'
  element.style.overflow = 'hidden'

  if (nextSibling?.textContent === 'Show replies') {
    nextSibling.style.height = '0px'
    nextSibling.style.overflow = 'hidden'
  }

  const hiddenTweet = createHiddenTweetElement(typeOfTweet)

  hiddenTweet.addEventListener('click', () => {
    showTweet(element, nextSibling)
    hiddenTweet.remove()
  })

  element.prepend(hiddenTweet)
}
