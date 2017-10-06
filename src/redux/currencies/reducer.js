import { RECEIVING_BITCOIN, RECEIVING_LITECOIN, RECEIVING_ETHEREUM, RECEIVING_RIPPLE, RECEIVING_EXCHANGE } from './actionTypes';

const initialState = { 
    bitcoin:{},
    ethereum:{},
    litecoin:{},
    ripple:{},
    exchangeRate:null
};


 export default function reducer(state = initialState, action) {
    switch(action.type) {
        case RECEIVING_BITCOIN:
        return {...state,
            bitcoin : action.btcNameAndExchange
        }
        case RECEIVING_ETHEREUM:
        return {...state,
            ethereum : action.ethNameAndExchange
        }
        case RECEIVING_LITECOIN:
        return {...state,
            litecoin: action.ltcNameAndExchange
        }
        case RECEIVING_RIPPLE:
        return {...state,
            ripple: action.rppNameAndExchange
        }
        case RECEIVING_EXCHANGE:
        return {...state,
            exchangeRate: action.exchangeRate
        }
        default:
            return state;
    }

}