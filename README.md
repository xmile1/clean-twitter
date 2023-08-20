# Clean Twitter/X.com (Hide Tweets by keywords, Hide Ads, etc.)

Clean Twitter/X.com is a browser extension designed to enhance your Twitter browsing experience. It allows you to hide tweets in Twitter threads that contain specified keywords. Additionally, it provides options to hide Ad tweets and suggestions for who to follow or subscribe to.


Key Features
- Keyword Filtering: Set specific keywords to filter out unwanted tweets.
- Hide or Notify: Choose to either hide the tweet/Ads completely or display a notice that the tweet/Ads was hidden.
- Granular Options: Customize your filtering preferences for tweets, ads, and suggestions.
- Privacy-Focused: No tracking or sign-in required.

All options can found in the extension popup menu.

## Contributing
Contributions are welcome! Please open an issue or PR if you would like to contribute. 

Adding a new filter is easy, Just add a new [tweet processor](src/contentScripts/scripts/tweetProcessor/tweetProcessors.ts) and an [option in the popup](src/popup/Popup.vue) to use it.

### Development

```bash
pnpm dev
```

Then **load extension in browser with the `extension/` folder**.

For Firefox developers, you can run the following command instead:

```bash
pnpm start:firefox
```

`web-ext` auto reload the extension when `extension/` files changed.

> While Vite handles HMR automatically in the most of the case, [Extensions Reloader](https://chrome.google.com/webstore/detail/fimgfedafeadlieiabdeeaodndnlbhid) is still recommanded for cleaner hard reloading.

## Credits

[Built using the Vitesse webext template](https://github.com/antfu/vitesse-webext)



## License
This project is licensed under the MIT license. See LICENSE for more details.
