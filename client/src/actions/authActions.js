import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';



//REGISTER
export const registerUser = (userData, history) => dispatch => {
  fetch('/api/users/register', {
     method: 'POST',
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
  },
     body: JSON.stringify(userData)
  })
  .then(res => {
    if(res.status === 400)
    {
      res.json().then(resp => {
        dispatch({
            type: GET_ERRORS,
            payload: resp
          })
        })
      } else {
        res.json().then(resp => history.push('/login'))
      }
  })
}

//Login
export const loginUser = userData => dispatch => {
  fetch('/api/users/login', {
     method: 'POST',
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
  },
     body: JSON.stringify(userData)
  }).then( res => {
    if(res.status === 400 || res.status === 404)
    {
      res.json().then(resp => {
        dispatch({
            type: GET_ERRORS,
            payload: resp
          })
        })
      } else {
        res.json().then(resp => {

          const { token } =  resp;

          localStorage.setItem('jwtToken', token);

          setAuthToken(token);

          const decoded = jwt_decode(token)
          //Set current user
          dispatch(setCurrentUser(decoded));
        })
      }
  })
};

//Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

//LOGOUT USER
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');

  //Remove auth header
  setAuthToken(false);

  //Set current user to and empty object ---> {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
}
