import { useCallback, useState } from "react";

import validator from 'validator';

import { regExName } from "../constants";

function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage.split('.')[0].trim() });

    const validEmail = validator.isEmail(`${values.Email}`);
    const validName = regExName.test(values.Name);
    const validForm = target.closest("form").checkValidity();

    setIsValid(validForm && validEmail && validName);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setIsValid };
}

export default useFormWithValidation;
