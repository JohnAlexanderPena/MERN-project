const Validator = require('validator');
const isEmpty = require('./is-empty.js');


module.exports  = function validateExperienceInput(data){
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : ''; //stringify title
  data.company = !isEmpty(data.company) ? data.company : ''; // stringify company.
  data.from = !isEmpty(data.from) ? data.from : ''; // stringify start from.


  if (Validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required'
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company title field is required'
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required'
  }



  return {
    errors,
    isValid: isEmpty(errors)
  };
}
