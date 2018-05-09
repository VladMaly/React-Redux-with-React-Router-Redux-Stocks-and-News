import { combineReducers } from 'redux';
import { counter } from './counter';
import { userState } from './userState';

// const rootReducer = combineReducers({
//     counter: counter, // using just one word syntax also works, but this is more delarative visually
//     userState: userState,
// });

// Don't combine them here, combine them inside configureStore
const rootReducer = {
    counter: counter, // using just one word syntax also works, but this is more delarative visually
    userState: userState
};

export default rootReducer;
