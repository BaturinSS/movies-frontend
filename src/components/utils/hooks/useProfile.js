import React from "react";
import validator from "validator";
import useFormWithValidation from "./useFormWithValidation";
import { textErrorInputEmail, textErrorInputName } from "../constants";
import { regExName } from "../constants";
import { TranslationContext } from '../../../contexts/TranslationContext'

const useProfile = () => {
  const {
    values, errors, isValid, setErrors, setValues,
    setIsValid, handleChange, resetForm,
  } = useFormWithValidation();

  const { currentUser } = React.useContext(TranslationContext);
  const [newName, setNewName] = React.useState(currentUser.name);
  const [newEmail, setNewEmail] = React.useState(currentUser.email);
  const [isPermission, setIsPermission] = React.useState(false);
  const [errorApi, setErrorApi] = React.useState('');

  React.useEffect(() => {
    const validEmail = validator.isEmail(`${values.inputEmail}`);
    if (!validEmail && values.inputEmail !== undefined) {
      const validInput = document.getElementById('inputEmail').checkValidity();
      if ((errors.inputEmail === '' || textErrorInputEmail) && validInput) {
        setErrors({ ...errors, inputEmail: textErrorInputEmail });
        setIsValid(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.inputEmail]);

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
  }, [isPermission])

  return {
    errors, isValid, resetForm, onChange, newName, newEmail,
    isPermission, setIsPermission, errorApi, setErrorApi,
  }
}

export default useProfile;
