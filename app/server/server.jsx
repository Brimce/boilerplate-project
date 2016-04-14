import Express from 'express';
import ReactDomServer from 'react-dom/server';
import React from 'React';
import {RouterContext, match, createMemoryHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux'
import CreateLocation from 'history/lib/createLocation';
import Routes from '../routes';
import {Provider} from 'react-redux';
import ConfigureStore from '../store/configure_store';
import Fs from 'fs';
import fetchComponentData from '../lib/fetchComponentData';

const pathLib = require('path');
const expressApp = Express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction
    ? process.env.PORT
    : 3000;

const publicPath = pathLib.join(__dirname, '..', '..', 'public');
// We point to our static assets
expressApp.use(Express.static(publicPath));
console.log(publicPath);

const indexPath = pathLib.join(publicPath, 'build', 'index.html');
let index = Fs.readFileSync(indexPath, {encoding: 'utf-8'});

expressApp.use((req, res) => {

    const memoryHistory = createMemoryHistory(req.url)
    const location = CreateLocation(req.url);
    const store = ConfigureStore(memoryHistory);
    const history = syncHistoryWithStore(memoryHistory, store)

    match({
        history,
        routes: Routes,
        location: history//req.url
    }, (err, redirectLocation, renderProps) => {
        if (err) {
            console.error(err);
            return res.status(500).end('Internal server error');
        }

        if (!renderProps)
            return res.status(404).end('Not found');

        function renderView() {
            try {
                console.log(`renderview ${JSON.stringify(store.getState())}`);
                //console.log(`render prop ${renderProps}`);
                const reactHtml = ReactDomServer.renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps}/>
                    </Provider>
                );
                console.log('renderview 1');

                const stringifyState = JSON.stringify(store.getState());
                //console.log('state from server:', stringifyState);
                //console.log('state from server:', JSON.parse(stringifyState));
                index = index.replace('reactHtml', reactHtml).replace('stringifyState', stringifyState);

                return index;
            } catch (e) {
                res.status(500).send('erreur 3: '+ e.message);
                console.log('erreur 3: ', e.message, e.stack);
            }
        }

        fetchComponentData(store.dispatch, renderProps.components, renderProps.params).then(renderView).catch(err => {
            res.end('erreur 1: ', err.message);
            console.log('erreur 1: ', err.message);
        }).then(html => res.end(html)).catch(err => {
            res.end('erreur 2: ', err.message);
            console.log('erreur 2: ', err.message);
        });
    });
});

// And run the server
expressApp.listen(port, function() {
    console.log('Server running on port ' + port);
});
