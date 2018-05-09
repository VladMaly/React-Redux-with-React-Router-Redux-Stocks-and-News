import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './src/_enter/Root';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux';
import { configureStore } from './src/store/configureStore';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const store = configureStore(middleware);

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
);