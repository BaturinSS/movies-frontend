import React from "react";

function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  function handleChange(evt) {
    const target = evt.target;
    const name = target.id;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage.split('.')[0].trim() });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = React.useCallback(
    (evt, newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      if (evt) evt.target.reset();
    }, [setValues, setErrors, setIsValid]);

  return {
    values, handleChange, errors, isValid,
    resetForm, setErrors, setIsValid, setValues,
  };
}

export default useFormWithValidation;
