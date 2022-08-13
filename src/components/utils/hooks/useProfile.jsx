import React from "react";
import validator from "validator";
import useFormWithValidation from "./useFormWithValidation";
import { textErrorInputEmail, textErrorInputName } from "../constants";
import { regExName } from "../constants";

const useProfile = () => {
  const {
    values, errors, isValid, setErrors, setIsValid, handleChange, resetForm,
  } = useFormWithValidation();

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

  return { errors, isValid, values, handleChange, resetForm }
}

export default useProfile;
