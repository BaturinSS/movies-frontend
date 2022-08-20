import { useState } from "react";

function useForm() {
  const [values, setValues] = useState({});

  function handleChange(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

export default useForm;
