import { useState } from "react";

import useFormWithValidation from "../../../components/utils/hooks/useFormWithValidation";

const useAuth = () => {
  const { values, handleChange, errors, isValid, resetForm, setIsValid } = useFormWithValidation();

  const onChange = (event) => {
    handleChange(event)
    console.log('change')
  }

  const onSubmitForm = (event) => {
    event.preventDefault();
    console.log('submit')
    event.target.reset();
    setIsValid(false);
  }

  return { errors, isValid, onChange, onSubmitForm }
}

export default useAuth;
