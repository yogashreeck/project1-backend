const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : '';
    data.mobileNumber = !isEmpty(data.mobileNumber) ? data.mobileNumber : '';

    if(!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
        errors.firstname = 'Name must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.firstname)) {
        errors.firstname = 'Name field is required';
    }
    if(!Validator.isLength(data.username, { min: 2, max: 30 })) {
        errors.username = 'Name must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.username)) {
        errors.username = 'Name field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if(!Validator.isLength(data.passwordConfirm, {min: 6, max: 30})) {
        errors.passwordConfirm = 'Password must have 6 chars';
    }

    if(!Validator.equals(data.password, data.passwordConfirm)) {
        errors.passwordConfirm = 'Password and Confirm Password must match';
    }

    if(Validator.isEmpty(data.passwordConfirm)) {
        errors.passwordConfirm = 'Password is required';
    }
    if(!Validator.isLength(data.mobileNumber, {  max: 10 })) {
        errors.mobileNumber = 'Mobile Number must be between 10 chars';
    }
    
    if(Validator.isEmpty(data.mobileNumber)) {
        errors.mobileNumber = 'Mobile Number field is required';
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}