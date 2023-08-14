import { processTweet } from './processTweet'
let observerInstance: any

const getTweetsContainer = async (): Promise<any> => {
  const targetElement = document.querySelector('[data-testid="primaryColumn"]')
  if (targetElement)
    return targetElement

  await new Promise(resolve => setTimeout(resolve, 500))
  return getTweetsContainer()
}

function observeTweets(element: Element, keywords: any, hideTweetCompletely: any): void {
  const observer = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach((mutation: MutationRecord) => {
      mutation.addedNodes.forEach((node: Node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE
            && (node as Element).matches('[data-testid="cellInnerDiv"]')
        )
          processTweet(node as HTMLElement, { keywords, hideTweetCompletely })
      })
    })
  })

  if (observerInstance)
    observerInstance.disconnect()
  observerInstance = observer

  observer.observe(element, { childList: true, subtree: true })
}

export async function initializeTweetObserver(
  keywords: string[],
  hideTweetCompletely: boolean,
): Promise<void> {
  const tweetsContainer = await getTweetsContainer()
  tweetsContainer
    .querySelectorAll('[data-testid="cellInnerDiv"]')
    .forEach((node: any) => processTweet(node, { keywords, hideTweetCompletely }))

  // continue to monitor for new tweets
  observeTweets(tweetsContainer, keywords, hideTweetCompletely)
}
