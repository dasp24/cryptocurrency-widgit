const fetch = require('node-fetch');



const obj = {currencies:{}}

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
        }
        return obj
    })
const getStuffInState = (id) => fetch(`http://coincap.io/page/${id}`)
    .then((response) => response.json())
    .then((data) => {
        obj.currencies[data.display_name] = {
                name: data.display_name,
                price: data.price_usd,
                changeInDay: data.cap24hrChange,
                id: data.id
        };
        return obj;
    });

const getIt = (a,b) => Promise.all([getStuffInState(a),
        getStuffInState(b)])
        .then(()=>console.log(obj))
   
getIt('XRP','BTC');

module.exports = {
    getStuff,
    getStuffInState
};