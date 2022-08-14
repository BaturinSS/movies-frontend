import React from "react";
import validator from "validator";
import useFormWithValidation from "./useFormWithValidation";

import {
  textErrorInputEmail, textErrorInputName, textErrorInputNew
} from "../constants";

import { regExName } from "../constants";
import { TranslationContext } from '../../contexts/TranslationContext'

const useProfile = () => {
  const {
    values, errors, isValid, setErrors,
    setIsValid, handleChange, resetForm,
  } = useFormWithValidation();

  const { currentUser } = React.useContext(TranslationContext);
  const [newName, setNewName] = React.useState(currentUser.name);
  const [newEmail, setNewEmail] = React.useState(currentUser.email);
  const [isPermission, setIsPermission] = React.useState(false);
  const [errorApi, setErrorApi] = React.useState('');
  const [isValidEmail, setIsValidEmail] = React.useState(false);
  const [isValidName, setIsValidName] = React.useState(false);

  React.useEffect(() => {
    const validEmail = validator.isEmail(`${values.inputEmail}`);
    if (!validEmail && values.inputEmail !== undefined) {
      const validInput = document.getElementById('inputEmail').checkValidity();
      if ((errors.inputEmail === '' || textErrorInputEmail) && validInput) {
        setErrors({ ...errors, inputEmail: textErrorInputEmail });
        setIsValidEmail(false);
        setIsValid(isValidEmail && isValidName)
      }
    } else if (values.inputEmail === currentUser.email) {
      setErrors({ ...errors, inputEmail: textErrorInputNew });
      setIsValidEmail(false);
      setIsValid(isValidEmail && isValidName)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.inputName, values.inputEmail]);

  React.useEffect(() => {
    const validName = regExName.test(`${values.inputName}`);
    if (!validName) {
      const validInput = document.getElementById('inputName').checkValidity();
      if ((errors.inputName === '' || textErrorInputName) && validInput) {
        setErrors({ ...errors, inputName: textErrorInputName });
        setIsValidName(false);
        setIsValid(isValidEmail && isValidName)
      };
    } else if (values.inputName === currentUser.name) {
      setErrors({ ...errors, inputName: textErrorInputNew });
      setIsValidName(false);
      setIsValid(isValidEmail && isValidName)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.inputName, values.inputEmail]);

  const onChange = (evt) => {
    handleChange(evt);
    evt.target.name === 'Email'
      ? setNewEmail(evt.target.value)
      : setNewName(evt.target.value);
    if (errorApi) setErrorApi('');
  }

  React.useEffect(() => {
    setErrorApi('');
    setNewName(currentUser.name);
    setNewEmail(currentUser.email)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPermission])

  return {
    errors, isValid, resetForm, onChange, newName, newEmail,
    isPermission, setIsPermission, errorApi, setErrorApi,
  }
}

export default useProfile;
