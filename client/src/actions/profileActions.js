import axios from 'axios';


import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types';

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


// export const createProfile = (profileData, history) => dispatch => {
//   debugger;
//
// axios.post('/api/profile', profileData)
// .then(res => history.push('/dashboard'))
// .catch(err =>
//
//   dispatch({
//     type: GET_ERRORS,
//     payload: err
//   })
// )
//
// }


// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  // const auth = localStorage.getItem('jwtToken')

  fetch('/api/profile', {
     method: 'POST',
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwtToken')
  },
     body: JSON.stringify(profileData)
  })
  .then(res => {
    console.log(res)
    if(res.status !== 200)
    {
      res.json().then(resp => {
        dispatch({
            type: GET_ERRORS,
            payload: resp
          })
        })
      } else {
        res.json().then(resp => history.push('/dashboard'))
      }
  })
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
