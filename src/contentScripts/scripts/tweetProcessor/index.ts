import { processTweet } from './processTweet'
let observerInstance: any

const getTweetsContainer = (): Element | null => {
  const targetElement = document.querySelector('[data-testid="primaryColumn"]')
  if (targetElement)
    return targetElement

  return null
}

function observeTweets(element: Element, options: any): void {
  const observer = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach((mutation: MutationRecord) => {
      mutation.addedNodes.forEach((node: Node) => {
        // urls to exclude
        const excludedPaths = [
          'followers',
          'verified_followers',
          'followers_you_follow',
          'following',
        ]
        const urlPath = location.href.split('/').pop() as string
        const isExcludedPath = excludedPaths.includes(urlPath)
        const isTweetSection = (node as Element).matches('[data-testid="cellInnerDiv"]')

        if (node.nodeType === Node.ELEMENT_NODE && isTweetSection && !isExcludedPath)
          processTweet(node as HTMLElement, options)
      })
    })
  })

  if (observerInstance)
    observerInstance.disconnect()
  observerInstance = observer

  observer.observe(element, { childList: true, subtree: true })
}

export async function initializeTweetObserver(options: any): Promise<void> {
  const tweetsContainer = getTweetsContainer()
  tweetsContainer?.querySelectorAll('[data-testid="cellInnerDiv"]')
    .forEach((node: any) => processTweet(node, options))

  // continue to monitor for new tweets
  observeTweets(document.body, options)
}
