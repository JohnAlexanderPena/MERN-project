const Validator = require('validator');
const isEmpty = require('./is-empty.js');


module.exports  = function validateLoginInput(data){
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : ''; //set to empty string if null
  data.status = !isEmpty(data.status) ? data.status : ''; // set to empty status if null.
  data.skills = !isEmpty(data.skills) ? data.skills : ''; // set to empty skills if null.
  // data.workouts = !isEmpty(data.workouts) ? data.workouts : ''; //set to empty workouts if null
  if (!Validator.isLength(data.handle, { min: 2, max: 40})) {
    errors.handle = 'Handle needs to be between 2 and 40 characters'
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required'
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required'
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required'
  }

  // if (Validator.isEmpty(data.workouts)) {
  //   errors.workouts = 'Workout field is required'
  // }

  if(!isEmpty(data.website)){ // if website is not empty
    if(!Validator.isURL(data.website)) { // validate the URL
      errors.website = 'Not a valid URL' // if URL is invalid send error
    }
  }

  if(!isEmpty(data.youtube)){ // if youtube is not empty
    if(!Validator.isURL(data.youtube)) { // validate the URL
      errors.youtube = 'Not a valid URL' // if URL is invalid send error
    }
  }

  if(!isEmpty(data.twitter)){ // if twitter is not empty
    if(!Validator.isURL(data.twitter)) { // validate the URL
      errors.twitter = 'Not a valid URL' // if URL is invalid send error
    }
  }

  if(!isEmpty(data.facebook)){ // if facebook is not empty
    if(!Validator.isURL(data.facebook)) { // validate the URL
      errors.facebook = 'Not a valid URL' // if URL is invalid send error
    }
  }

  if(!isEmpty(data.linkedin)){ // if linkedin is not empty
    if(!Validator.isURL(data.linkedin)) { // validate the URL
      errors.linkedin = 'Not a valid URL' // if URL is invalid send error
    }
  }

  if(!isEmpty(data.instagram)){ // if instagram is not empty
    if(!Validator.isURL(data.instagram)) { // validate the URL
      errors.instagram = 'Not a valid URL' // if URL is invalid send error
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
