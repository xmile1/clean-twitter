import {
  hidePeopleToFollowSuggestion,
  hideSubscriptionSuggesstion,
  hideTweetWithKeyword, hideTwitterAds,

} from './tweetProcessors'

export interface TweetProcessor {
  run(element: HTMLElement, options: any): boolean
}

class ProcessTweetPipeline {
  private operations: TweetProcessor[] = [
    hideTweetWithKeyword,
    hideTwitterAds,
    hidePeopleToFollowSuggestion,
    hideSubscriptionSuggesstion,
  ]

  public run(element: HTMLElement, options: any): boolean {
    for (const operation of this.operations) {
      const done = operation.run(element, options)
      if (done)
        break
    }
    return true
  }
}

const tweetProcessor = new ProcessTweetPipeline()

export const processTweet = (element: HTMLElement, options: any) => {
  tweetProcessor.run(element, options)
}
