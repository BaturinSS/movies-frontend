import React from "react";
import validator from "validator";
import { regExName } from "../constants";
import useFormWithValidation from "./useFormWithValidation";
import { textErrorInputEmail, textErrorInputName } from "../constants";

const useRegistration = () => {
  const textErrorInputPassword = 'Пароль от 6 до 30 символов.';
  const {
    values, errors, isValid, setErrors, setIsValid, handleChange, resetForm,
  } = useFormWithValidation();

  React.useEffect(() => {
    const validName = regExName.test(`${values.inputName}`);
    if (!validName) {
      const validInput = document.getElementById('inputName').checkValidity();
      if ((errors.inputName === '' || textErrorInputName) && validInput) {
        setErrors({ ...errors, inputName: textErrorInputName });
      };
      setIsValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.inputName]);

  React.useEffect(() => {
    const validEmail = validator.isEmail(`${values.inputEmail}`);
    if (!validEmail) {
      const validInput = document.getElementById('inputEmail').checkValidity();
      if ((errors.inputEmail === '' || textErrorInputEmail) && validInput) {
        setErrors({ ...errors, inputEmail: textErrorInputEmail });
        setIsValid(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.inputEmail]);

  React.useEffect(() => {
    const validPassword = values.inputPassword
      ? `${values.inputPassword}`.length > 5
      : false

    if (!validPassword) {
      const validInput = document.getElementById('inputPassword').checkValidity();
      if ((errors.inputPassword === '' || textErrorInputPassword) && validInput) {
        setErrors({ ...errors, inputPassword: textErrorInputPassword });
        setIsValid(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.inputPassword]);

  return { errors, isValid, values, handleChange, resetForm };
}

export default useRegistration;
