let observerInstance: any;
const deleteTweet = (node: Node, keywords: any, hideTweetCompletely: boolean) => {
  if (
    node.nodeType === Node.ELEMENT_NODE &&
    (node as Element).matches('[data-testid="cellInnerDiv"]')
  ) {
    const tweetText = (node as Element).querySelector('[data-testid="tweetText"]')?.innerText;

    if (
      tweetText &&
      keywords.some((keyword) => keyword && tweetText.toLowerCase().includes(keyword.toLowerCase()))
    ) {
      (node as Element).style.height = hideTweetCompletely ? "0px" : "30px";
      (node as Element).style.overflow = "hidden";
      // check nextSibling text is 'show replies
      if (node.nextSibling?.textContent === "Show replies") {
        node.nextSibling.style.height = "0px";
        node.nextSibling.style.overflow = "hidden";
      }

      // create a div that says "tweet hidden because it contains a keyword" click to show
      const hiddenTweet = document.createElement("div");
      hiddenTweet.innerText = "Tweet hidden because it contains a keyword (Click to view tweet)";
      hiddenTweet.style.color = "grey";
      hiddenTweet.style.padding = "8px 8px 8px 32px";
      hiddenTweet.style.fontFamily = "TwitterChirp";
      hiddenTweet.style.cursor = "pointer";
      //  on click, remove style height and remove hiddenTweet
      hiddenTweet.addEventListener("click", () => {
        (node as Element).style.height = "unset";
        (node as Element).style.overflow = "unset";
        node.nextSibling.style.height = "unset";
        node.nextSibling.style.overflow = "unset";

        hiddenTweet.remove();
      });
      (node as Element).prepend(hiddenTweet);
    }
  }
};

export async function hideTweetsWithKeyword(
  keywords: string[],
  hideTweetCompletely: boolean
): Promise<void> {
  function waitForElement(): void {
    const targetElement = document.querySelector('[data-testid="primaryColumn"]');
    if (targetElement) {
      targetElement
        .querySelectorAll('[data-testid="tweet"]')
        .forEach((node) => deleteTweet(node, keywords, hideTweetCompletely));
      observeTweets(targetElement);

      // first check all existing tweets
    } else {
      setTimeout(waitForElement, 500);
    } // Retry after 500 milliseconds
  }

  function observeTweets(element: Element): void {
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((mutation: MutationRecord) => {
        mutation.addedNodes.forEach((node: Node) => {
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            (node as Element).matches('[data-testid="cellInnerDiv"]')
          )
            deleteTweet(node, keywords, hideTweetCompletely);
        });
      });
    });

    if (observerInstance) observerInstance.disconnect();
    observerInstance = observer;

    observer.observe(element, { childList: true, subtree: true });
  }

  // Start waiting for the target element
  waitForElement();
}
