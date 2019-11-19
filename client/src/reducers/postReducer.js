import { ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST } from '../actions/types'

const initialState = {
  posts: [],
  post: {},
  loading: false
}



export default function(state = initialState, action) {
  switch(action.type) {
    case POST_LOADING:
    return {
      ...state,
      loading: true //adding new post coming in from payload automatically
    }
    case GET_POSTS:
    return {
      ...state,
      posts: action.payload,
      loading: false //Stop spinner
    }
    case ADD_POST:
    return {
      ...state,
      posts:[action.payload, ...state.posts] //adding new post coming in from payload automatically
    }
    case DELETE_POST:
    return {
      ...state,
      posts: state.posts.filter(post => post._id !== action.payload), // remove post that matches id and returns other posts
    }
    default:
    return state;
  }
}
