import axios from 'axios';


import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, GET_PROFILES } from './types';

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

//Get specifin profile by Handle
export const getProfileByHandle = (handle) => dispatch => {
dispatch(setProfileLoading());
axios.get(`/api/profile/handle/${handle}`)
.then(res =>
dispatch({
  type: GET_PROFILE,
  payload: res.data
}))
  .catch(err =>
    dispatch({
      type: GET_PROFILE,
      payload: null
    })
  )
}

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

export const addExperience = (expData, history) => dispatch => {
  fetch('/api/profile/experience', {
     method: 'POST',
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwtToken')
  },
     body: JSON.stringify(expData)
  })
  .then(res => {
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

//Add education
export const addEducation = (eduData, history) => dispatch => {
  fetch('/api/profile/education', {
     method: 'POST',
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwtToken')
  },
     body: JSON.stringify(eduData)
  })
  .then(res => {
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

//Delete experience
export const deleteExperience = (id) => dispatch => {
  fetch(`/api/profile/experience/${id}`, {
     method: 'DELETE',
     headers: {
        'Authorization': localStorage.getItem('jwtToken')
  },
     body: JSON.stringify(id)
  })
  .then(res => {
    if(res.status !== 200)
    {
      res.json().then(resp => {
        dispatch({
            type: GET_ERRORS,
            payload: resp
          })
        })
      } else {
        res.json().then(resp =>
          dispatch({
            type: GET_PROFILE,
            payload: resp
          })
        )
      }
  })
}


//Delete Education
export const deleteEducation = (id) => dispatch => {
  fetch(`/api/profile/education/${id}`, {
     method: 'DELETE',
     headers: {
        'Authorization': localStorage.getItem('jwtToken')
  },
     body: JSON.stringify(id)
  })
  .then(res => {
    if(res.status !== 200)
    {
      res.json().then(resp => {
        dispatch({
            type: GET_ERRORS,
            payload: resp
          })
        })
      } else {
        res.json().then(resp =>
          dispatch({
            type: GET_PROFILE,
            payload: resp
          })
        )
      }
  })
}

//Get all Profiles
export const getProfiles = () => dispatch => {
dispatch(setProfileLoading()); // start loading spinner

axios.get('/api/profile/all')
.then(res =>
dispatch({
  type: GET_PROFILES,
  payload: res.data
}))
  .catch(err =>
    dispatch({
      type: GET_PROFILES,
      payload: null
    })
  )
}


//Delete profile and Account
export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure? This CAN NOT BE UNDONE')) {
     fetch('/api/profile', {
    method: 'delete',
    headers: {
      'Authorization': localStorage.getItem('jwtToken')
    }
  }).then(res => {
    if(res.status !== 200)
    {
      res.json().then(resp => {
        dispatch({
            type: GET_ERRORS,
            payload: resp
          })
        })
      } else {
        res.json().then(resp =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        }))
      }
  })
  }
}
