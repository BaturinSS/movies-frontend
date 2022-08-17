import React from "react";
import validator from "validator";
import { REG_EX_NAME } from "../constants";
import useFormWithValidation from "./useFormWithValidation";
import {
  TEXT_ERROR_INPUT_EMAIL, TEXT_ERROR_INPUT_NAME,
  TEXT_ERROR_INPUT_PASSWORD,
} from "../constants";

const useRegistration = () => {
  const [isValidPassword, setIsValidPassword] = React.useState();

  const {
    values, errors, isValid, setErrors, setIsValid, handleChange, resetForm,
  } = useFormWithValidation();

  React.useEffect(() => {

    const validName = REG_EX_NAME.test(`${values.inputName}`);
    if (!validName) {
      const validInput = document.getElementById('inputName').checkValidity();
      if ((errors.inputName === '' || TEXT_ERROR_INPUT_NAME) && validInput) {
        setErrors({ ...errors, inputName: TEXT_ERROR_INPUT_NAME });
      };
      setIsValid(false);
    }

    const validEmail = validator.isEmail(`${values.inputEmail}`);
    if (!validEmail) {
      const validInput = document.getElementById('inputEmail').checkValidity();
      if ((errors.inputEmail === '' || TEXT_ERROR_INPUT_EMAIL) && validInput) {
        setErrors({ ...errors, inputEmail: TEXT_ERROR_INPUT_EMAIL });
        setIsValid(false);
      }
    }

    const validPassword = values.inputPassword
      ? `${values.inputPassword}`.length > 5
      : false

    if (!validPassword) {
      const validInput = document.getElementById('inputPassword').checkValidity();
      if ((errors.inputPassword === '' || TEXT_ERROR_INPUT_PASSWORD) && validInput) {
        setErrors({ ...errors, inputPassword: TEXT_ERROR_INPUT_PASSWORD });
        setIsValid(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.inputName, values.inputEmail, values.inputPassword]);

  return { errors, isValid, values, handleChange, resetForm };
}

export default useRegistration;
