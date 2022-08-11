import React from "react";

import validator from "validator";

import { regExName } from "../constants";

import useFormWithValidation from "../../../components/utils/hooks/useFormWithValidation";

const useAuth = () => {
  const {
    values, handleChange, errors,
    isValid, resetForm, setErrors,
    setIsValid,
  } = useFormWithValidation();

  React.useEffect(() => {
    const validName = regExName.test(`${values.inputName}`);
    if (!validName) {
      const validInput = document.getElementById('inputName').checkValidity();
      if ((errors.inputName === '' || 'Только латиницу, кириллицу, пробел или дефис') && validInput) {
        setErrors({ ...errors, inputName: 'Только латиница, кириллица, пробел или дефис.' });
      };
      setIsValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.inputName]);

  React.useEffect(() => {
    const validEmail = validator.isEmail(`${values.inputEmail}`);
    if (!validEmail) {
      const validInput = document.getElementById('inputEmail').checkValidity();
      if ((errors.inputEmail === '' || 'Почта не соответствует формату.') && validInput) {
        setErrors({ ...errors, inputEmail: 'Почта не соответствует формату.' });
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
      if ((errors.inputPassword === '' || 'Пароль от 6 до 30 символов.') && validInput) {
        setErrors({ ...errors, inputPassword: 'Пароль от 6 до 30 символов.' });
        setIsValid(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.inputPassword]);

  const onChange = (event) => {
    handleChange(event);
  }
  const onSubmitForm = (event) => {
    event.preventDefault();
    event.target.reset();
    resetForm();
  }

  return { errors, isValid, onChange, onSubmitForm }
}

export default useAuth;
