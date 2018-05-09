import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
// import createLogger from 'redux-logger';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import DevTools from '../_enter/DevTools';
import { routerReducer } from 'react-router-redux';

/**
 * Entirely optional, this tiny library adds some functionality to
 * your DevTools, by logging actions/state to your console. Used in
 * conjunction with your standard DevTools monitor gives you great
 * flexibility!
 */
// const logger = createLogger();

const configureStore = (routerMiddleware) => {
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  })

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk, routerMiddleware),
      DevTools.instrument()
    )
  )

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
};

export default configureStore;
