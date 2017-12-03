# Cryptocurrency-widgit

I have Developing an web appication to track your cryptocurrencies values and see your portfolio values. 

## Note

The app takes live data from the coin market cap API and provides up to date market value for the top 100 coins on the market.

The request for coin data is done every 60 seconds and the values will update instantly.


## Instuction for use

This app is now online on <a href="https://infinite-mountain-34561.herokuapp.com/">Heroku</a>

If you want to install this locally please follow the following steps:

## Step 1 - system requirements

Before cloning the files make sure you have the most up to date version of Node.

You can double check you have this installed by running ``node -v`` in your terminal.

You can always download the latest version <a href="https://nodejs.org/en/download/">here</a>.

Make sure that NPM is installed as well as git

## Step 2 - downloading and starting the app

`git clone https://github.com/dasp24/cryptocurrency-widgit.git`

`cd cryptocurrency-widgit`

`npm install`

`npm start`

This will automatically open the app on http://localhost:3000/

## Using the app

When adding a new coin please put in the name of the currency. 

All coins will be remembered locally so when the page is refreshed the previous coins will re-render. So if you share a computer and dont want anyone to know your portfolio remove the coin or change the values.

## Built With
    node-fetch
    react
    react-dom
    react-native
    react-scripts
    react-twitter-widgets

## Author
Daniel Parkes