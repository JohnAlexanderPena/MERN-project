const Validator = require('validator');
const isEmpty = require('./is-empty.js');


module.exports  = function validateEducationInput(data){
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : ''; //stringify title
  data.degree = !isEmpty(data.degree) ? data.degree : ''; // stringify degree.
  data.from = !isEmpty(data.from) ? data.from : ''; // stringify start from.
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : ''; // stringify company.



  if (Validator.isEmpty(data.school)) {
    errors.school = 'School field is required'
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required'
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required'
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
      errors.fieldofstudy = 'Field of Study field is required'
    }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
