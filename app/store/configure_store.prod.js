import { createStore, applyMiddleware } from 'redux'
import { syncHistory } from 'react-router-redux'
import { browserHistory } from 'react-router'
import Thunk from 'redux-thunk'
import RootReducer from './../reducers/root_reducer'
import PromiseMiddleware from '../lib/promiseMiddleware';
import ErrorMiddleware from './../middleware/error_middleware';

export default function ConfigureStore(initialState) {
    return createStore(
        RootReducer,
        initialState,
        applyMiddleware(Thunk, syncHistory(browserHistory),PromiseMiddleware, ErrorMiddleware)
    );
}
