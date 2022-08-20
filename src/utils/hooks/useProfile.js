import React from "react";
import validator from "validator";
import useFormWithValidation from "./useFormWithValidation";

import {
  TEXT_ERROR_INPUT_EMAIL, TEXT_ERROR_INPUT_NAME,
  TEXT_ERROR_INPUT_NEW, REGEX_INPUT_FORM_NAME,
} from "../constants";

import { TranslationContext } from '../../contexts/TranslationContext'

const useProfile = () => {
  const { currentUser } = React.useContext(TranslationContext);
  const [newName, setNewName] = React.useState(currentUser.name);
  const [newEmail, setNewEmail] = React.useState(currentUser.email);
  const [isPermission, setIsPermission] = React.useState(false);
  const [errorApi, setErrorApi] = React.useState('');
  const { name: userName, email: userEmail } = currentUser;

  const {
    values, errors, isValid, setErrors,
    setIsValid, handleChange, resetForm,
  } = useFormWithValidation();

  React.useEffect(() => {
    const validEmail = validator.isEmail(`${values.inputEmail}`);

    if (!(validEmail) && (values.inputEmail !== undefined)) {
      const validInput = document.getElementById('inputEmail').checkValidity();

      if (((errors.inputEmail === '') || (errors.inputEmail === TEXT_ERROR_INPUT_EMAIL)) && validInput) {
        setErrors({ ...errors, inputEmail: TEXT_ERROR_INPUT_EMAIL });
      };

      setIsValid(false);
    } else if (values.inputEmail === userEmail) {
      setErrors({ ...errors, inputEmail: TEXT_ERROR_INPUT_NEW });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.inputEmail]);

  React.useEffect(() => {
    const validName = REGEX_INPUT_FORM_NAME.test(`${values.inputName}`);

    if (!validName) {
      const validInput = document.getElementById('inputName').checkValidity();

      if (((errors.inputName === '') || (errors.inputName === TEXT_ERROR_INPUT_NAME)) && (validInput)) {
        setErrors({ ...errors, inputName: TEXT_ERROR_INPUT_NAME });
      };

      setIsValid(false);
    } else if (values.inputName === userName) {
      setErrors({ ...errors, inputName: TEXT_ERROR_INPUT_NEW });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.inputName]);

  const onChange = (evt) => {
    const { name, value } = evt.target;
    handleChange(evt);

    (name === 'Email')
      ? setNewEmail(value)
      : setNewName(value);

    if (errorApi) setErrorApi('');
  };

  React.useEffect(() => {
    setErrorApi('');
    setNewName(userName);
    setNewEmail(userEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPermission]);

  return {
    errors, isValid, resetForm, onChange, newName, newEmail,
    isPermission, setIsPermission, errorApi, setErrorApi,
  }
}

export default useProfile;
