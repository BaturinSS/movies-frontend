import React from "react";
import validator from "validator";
import useFormWithValidation from "./useFormWithValidation";
import { TEXT_ERROR_INPUT_EMAIL } from "../constants";

const useAuth = () => {
  const {
    values, handleChange, errors, isValid, resetForm, setErrors, setIsValid,
  } = useFormWithValidation();

  React.useEffect(() => {
    const validEmail = validator.isEmail(`${values.inputEmail}`);
    if (!validEmail) {
      const validInput = document.getElementById('inputEmail').checkValidity();
      if ((errors.inputEmail === '' || TEXT_ERROR_INPUT_EMAIL) && validInput) {
        setErrors({ ...errors, inputEmail: TEXT_ERROR_INPUT_EMAIL });
        setIsValid(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.inputEmail]);

  return { errors, isValid, values, handleChange, resetForm }
}

export default useAuth;
