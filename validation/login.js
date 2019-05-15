const Validator = require('validator');
const isEmpty  = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';


  if(!Validator.isEmail(data.email)) {
    errors.email = 'Имейлът е невалиден';
  }
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Полето за имейл е задължително';
  }
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Полето за парола е задължително';
  }


  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
