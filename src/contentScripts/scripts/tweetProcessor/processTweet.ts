import {
  hideTweetWithKeyword,

} from './tweetProcessors'

export interface TweetProcessor {
  run(element: HTMLElement, options: any): void
}

class ProcessTweetPipeline {
  private operations: TweetProcessor[] = [
    hideTweetWithKeyword,
  ]

  public addOperation(operation: TweetProcessor): void {
    this.operations.push(operation)
  }

  public run(element: HTMLElement, options: any): void {
    for (const operation of this.operations)
      operation.run(element, options)
  }
}

const tweetProcessor = new ProcessTweetPipeline()

export const processTweet = (element: HTMLElement, options: any) => {
  tweetProcessor.run(element, options)
}
