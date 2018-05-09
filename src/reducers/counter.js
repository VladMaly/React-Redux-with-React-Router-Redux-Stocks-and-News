import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER
} from '../constants/actionTypes';

const intialState = { number: 1 };
export const counter = (state = intialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state;
    case DECREMENT_COUNTER:
      return state;
    default:
      return state;
  }
}

// export default counter;