import {RECEIVING_BITCOIN, RECEIVING_ETHEREUM, RECEIVING_LITECOIN, RECEIVING_RIPPLE, RECEIVING_EXCHANGE} from './actionTypes';
import {bitcoin, ethereum, litecoin, ripple, exchange} from '../../api/currencies';


export function loadBitcoin() {
    return async(dispatch) => {
        const btcNameAndExchange = await bitcoin()
            .then((data) => {
                console.log(data)
                return {
                name: data.display_name,
                price: data.price_usd,
                changeInDay: data.cap24hrChange
                }
            });
        dispatch({
            type: RECEIVING_BITCOIN,
            btcNameAndExchange
        });
    }
}

export function loadEthereum() {
    return async(dispatch) => {
        const ethNameAndExchange = await ethereum()
            .then((data) => {
                return {
                name: data.display_name,
                price: data.price_usd,
                changeInDay: data.cap24hrChange
                }
            });
        dispatch({
            type: RECEIVING_ETHEREUM,
            ethNameAndExchange
        });
    }
}

export function loadLitecoin() {
    return async(dispatch) => {
        const ltcNameAndExchange = await litecoin()
            .then((data) => {
                return {
                name: data.display_name,
                price: data.price_usd,
                changeInDay: data.cap24hrChange
                }
            });
        dispatch({
            type: RECEIVING_LITECOIN,
            ltcNameAndExchange
        });
    }
}

export function loadRipple() {
    return async(dispatch) => {
        const rppNameAndExchange = await ripple()
            .then((data) => {
                return {
                name: data.display_name,
                price: data.price_usd,
                changeInDay: data.cap24hrChange
                }
            });
        dispatch({
            type: RECEIVING_RIPPLE,
            rppNameAndExchange
        });
    }
}

export function loadExchangeRate() {
    return async(dispatch) => {
        const exchangeRate = await exchange()
            .then((data) => 
                 data.rates.USD
            );
        dispatch({
            type: RECEIVING_EXCHANGE,
            exchangeRate
        });
    }
}

