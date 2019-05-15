const Validator = require('validator');
const isEmpty  = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if(!Validator.isLength(data.name, { minimum: 2, max: 30 })){
    errors.name = 'Името трябва да е между 2 и 30 знака.'
  }

  if(Validator.isEmpty(data.name)) {
    errors.name = 'Полето за име е задължително';
  }
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Полето за имейл е задължително';
  }
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Имейлът е невалиден';
  }
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Полето за парола е задължително';
  }
  if(!Validator.isLength(data.password, { min: 6, max: 30})) {
    errors.password = 'Паролата трябва да е между 6 и 30 знака';
  }
  if(Validator.isEmpty(data.password2)) {
    errors.password2 = 'Полето за повторна парола е задължително';
  }
  if(!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'паролите трябва да съвпадат';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
