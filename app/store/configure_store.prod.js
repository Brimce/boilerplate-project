import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
//import { routerReducer, routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import Thunk from 'redux-thunk'
import RootReducer from './../reducers/root_reducer'
import PromiseMiddleware from '../lib/promiseMiddleware';
import ErrorMiddleware from './../middleware/error_middleware';

export default function ConfigureStore(initialState) {
    /*const reducer = combineReducers({
        ...RootReducer,
        routing: routerReducer
    });*/

    return createStore(
        RootReducer,
        initialState,
        applyMiddleware(Thunk, routerMiddleware(browserHistory),PromiseMiddleware, ErrorMiddleware)
    );
}
