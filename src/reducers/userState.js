import {
    USERSTATE_IS_LOGGED_IN,
} from '../constants/actionTypes';

const intialState = { isLoggedIn: false, name: '' };

export const userState = (state = intialState, action) => {
    switch (action.type) {
        case USERSTATE_IS_LOGGED_IN:
            return state;
        default:
            return state;
    }
}