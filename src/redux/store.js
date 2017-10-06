import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import currencies from './currencies/reducer';

export default () => {
    return createStore(
        combineReducers({
            currencies
        }),
        applyMiddleware(thunk)
    );
}