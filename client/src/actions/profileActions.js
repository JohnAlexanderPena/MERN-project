import axios from 'axios';


import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE } from './types';

// if we find a profile with the endpoint it will receive the data
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

axios.get('/api/profile')
.then(res =>
dispatch({
  type: GET_PROFILE,
  payload: res.data
}))
.catch(err =>
  dispatch({
    type: GET_PROFILE,
    payload: {}
  })
)

}


//Create profle loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

//CLear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}
