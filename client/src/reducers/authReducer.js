import { TEST_DISPATCH } from '../actions/types'

const intitialState = {
  isAuthenticated: false,
  user: {},
}

export default function(state = intitialState, action) {
  switch(action.type) {
    case TEST_DISPATCH:
    return {
      ...state,
      user: action.payload    //fill user with payLoad from authActions userData
    }
    default:
    return state;
  }
}
