const fetch = require('node-fetch');

export const getExchangeRate = () => fetch('http://api.fixer.io/latest?symbols=USD&base=GBP')
    .then((response) => response.json())
    .then((data) =>
        data.rates.USD
    );

export const getCoinAndValue = (ids) =>
    ids.forEach((coinID) =>
        fetch(`http://coincap.io/page/${coinID}`))
        .then((response) => response.json())
        .then((data) => {
            return {
                name: data.display_name,
                price: data.price_usd,
                changeInDay: data.cap24hrChange
            };
        });