import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
  let errors = {};
//Validations for signup form 
  if (Validator.isEmpty(data.password)) {
    errors.password = "This field is required";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "This field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
