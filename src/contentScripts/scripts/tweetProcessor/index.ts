import { processTweet } from './processTweet'
let observerInstance: any

const getTweetsContainer = async (): Promise<any> => {
  const targetElement = document.querySelector('[data-testid="primaryColumn"]')
  if (targetElement)
    return targetElement

  await new Promise(resolve => setTimeout(resolve, 500))
  return getTweetsContainer()
}

function observeTweets(element: Element, options: any): void {
  const observer = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach((mutation: MutationRecord) => {
      mutation.addedNodes.forEach((node: Node) => {
        const isInTimelineView = (node as Element).closest('[aria-label="Timeline: Your Home Timeline"]')
        const isTweetSection = (node as Element).matches('[data-testid="cellInnerDiv"]')

        if (node.nodeType === Node.ELEMENT_NODE && isTweetSection && isInTimelineView)
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
  const tweetsContainer = await getTweetsContainer()
  tweetsContainer
    .querySelectorAll('[data-testid="cellInnerDiv"]')
    .forEach((node: any) => processTweet(node, options))

  // continue to monitor for new tweets
  observeTweets(document.body, options)
}
