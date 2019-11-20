import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';
const intitialState = {};

export default function(state = {intitialState}, action) {
  switch(action.type) {
    case GET_ERRORS:
    return action.payload;
    case CLEAR_ERRORS:
    return {};
    default:
    return state;
  }
}
