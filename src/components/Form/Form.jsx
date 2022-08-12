import './Form.css';

import React from "react";

function Form({ config, children, modifier, onSubmitForm }) {
  const { idForm } = config;
  return (
    <>
      <form
        id={`${idForm}`}
        className={`form ${modifier ? modifier : ''}`}
        onSubmit={onSubmitForm}
        noValidate
      >
        <div className={`form__inputs`}>{children}</div>
      </form>
    </>
  )
}
export default Form;