# Cryptocurrency-widgit

I am Developing a widgit to use to track your cryptocurrencies. once fully made you can select your currencies, twitter feeds and a reddit feed, you will be able to 

## Note

The app takes live data from the coincap API and provides up to date market value of any coins possible to take from coincap.

You can choose any coins, add how many of each you have a total will show the full worth of any portfolio, or the portfolio you would like to have.

The request for coin data is done every 30 seconds and it will update as soon as a change is received.

I have put some functionality into getting and removing twitter feeds. This is see any twitter feeds but the idea was that they would relate to cryptocoins and be useful to see next to a portfolio.


## Instuction for use

Before cloning the files make sure you have the most up to date version of Node.

You can double check you have this installed by running ``node -v`` in your terminal.

You can always download the latest version <a href="https://nodejs.org/en/download/">here</a>.

Follow these steps to set up this project locally:

`git clone https://github.com/dasp24/cryptocurrency-widgit.git`

`cd cryptocurrency-widgit`

`npm install`

`npm start`

This will automatically open the app on http://localhost:3000/

## Using the app

When adding a new coin please put in the cryptocurrency ID. 

e.g for Bitcoin put in BTC, Litecoin -> LTC etc...

All coins asked for will be remembered locally so when the page is refreshed the previous coins will re-render, the same is true of the twitter feeds. 

The twitterfeed takes the profile name as written on twitter

## Built With
    node-fetch
    react
    react-dom
    react-native
    react-scripts
    react-twitter-widgets

## Author
Daniel Parkes