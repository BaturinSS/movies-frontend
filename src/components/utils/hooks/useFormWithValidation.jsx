import React from "react";

function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.id;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage.split('.')[0].trim() });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = React.useCallback(
    (event, newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      event.target.reset();
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values, handleChange, errors,
    isValid, resetForm, setErrors,
    setIsValid,
  };
}

export default useFormWithValidation;
