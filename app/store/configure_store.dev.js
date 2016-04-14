import { createStore, applyMiddleware, compose } from 'redux'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import CreateHistory from 'history/lib/createMemoryHistory';
import { browserHistory } from 'react-router'
import DevTools from './../containers/DevTools'
import Thunk from 'redux-thunk'
import CreateLogger from 'redux-logger'
import RootReducer from './../reducers/root_reducer';
import PromiseMiddleware from './../middleware/promiseMiddleware';
import ErrorMiddleware from './../middleware/error_middleware';

export default function ConfigureStore(history,initialState) {

    //client
    if (process.env.BROWSER) {
        console.log('config store from client history : ${history}',history);
        const reduxRouterMiddleware = routerMiddleware(history);

        const store = createStore(
            RootReducer,
            initialState,
            compose(
                applyMiddleware(Thunk, reduxRouterMiddleware, CreateLogger(), PromiseMiddleware, ErrorMiddleware),
                DevTools.instrument()
            )
        );

        // Required for replaying actions from devtools to work
        try {
            reduxRouterMiddleware.listenForReplays(store);
            //console.log(store.getState());
        } catch (e) {
            console.log(e);
        }

        if (module.hot) {
            // Enable Webpack hot module replacement for reducers
            module.hot.accept('./../reducers/root_reducer', () => {
                const nextRootReducer = require('./../reducers/root_reducer').default
                store.replaceReducer(nextRootReducer);
            });
        }

        console.log(store.getState());
        return store;
    }

    //server
    return createStore(
        RootReducer,
        initialState,
        compose(
            applyMiddleware(Thunk, CreateLogger(), PromiseMiddleware),
            DevTools.instrument()
        )
    );

}
