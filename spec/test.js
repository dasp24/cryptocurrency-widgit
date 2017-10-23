const fetch = require('node-fetch');

const obj = {
    currencies: {}
};

const getStuff = (id) => fetch(`http://coincap.io/page/${id}`)
    .then((response) => response.json())
    .then((data) => {
        const obj = {
            [data.display_name]: {
                name: data.display_name,
                price: data.price_usd,
                changeInDay: data.cap24hrChange,
                id: data.id
            }
        };
        return obj;
    });
const getStuffInState = (id) => fetch(`https://api.coinmarketcap.com/v1/ticker/${id}/?convert=GBP`,{cache: 'no-store'})
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        obj.currencies[data[0].name] = {
            name: data[0].name,
            price: data[0].price_gbp,
            changeInDay: data[0].percent_change_24h,
            id: data[0].symbol
        };
        return obj;
    })
    .then(data=>console.log(data));

    getStuffInState('bitcoin');

const getIt = (a, b) => Promise.all([getStuffInState(a),
        getStuffInState(b)
    ])
    .then(() => console.log(obj))

    const obj2={}
const allNamesAndIds = () => fetch('http://coincap.io/coins')
    .then((response) => response.json())
    .then((data) => {
        Promise.all(data.forEach((id) => {
        fetch(`http://coincap.io/page/${id}`)
            .then((response) => response.json())
            .then((data) => {
                obj2[data.display_name] = data.id;
            });
    }))
    .then(()=> obj2)
    })
    .then((data) => console.log(data));

module.exports = {
    getStuff,
    getStuffInState,
    getIt
};