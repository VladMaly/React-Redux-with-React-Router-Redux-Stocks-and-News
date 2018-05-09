import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const configureStore = (routerMiddleware) => {

  const reducer = combineReducers({
    ...reducers
  })

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk, routerMiddleware)
    )
  )
  return store;
};

export default configureStore;