import React                from 'react';
import ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import { Provider }         from 'react-redux';
import { fromJS }           from 'immutable';
import Routes               from '../routes.jsx';
import ImmutifyState        from '../lib/immutifyState';
import ConfigureStore from '../store/configure_store';

if ( !window.$REDUX_STATE )
    console.log( 'server-rendering state null: ', state );

const initialState = ImmutifyState(window.$REDUX_STATE);
console.log( 'server-rendering state restored: ', initialState );

const store = ConfigureStore(initialState,browserHistory);

ReactDom.render(
  <Provider store={store}>
    <Router children={Routes} history={browserHistory} />
  </Provider>,
  document.getElementById('react-view')
);
