import { ADD_POST } from '../actions/types'

const initialState = {
  posts: [],
  post: {},
  loading: false
}



export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_POST:
    return {
      ...state,
      posts:[action.payload, ...state.posts] //adding new post coming in from payload automatically
    }
    default:
    return state;
  }
}
