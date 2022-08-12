import "./FormInput.css";

import React from "react";

function FormInput({
  config, errors,
  onChange, value, modifier,
  modifierLabel, onFocus,
  autoComplete,
}) {
  const {
    idInput, placeholder, textLabel,
    required, type, minLength, maxLength,
  } = config;

  const textMessageError = errors[`${idInput}`];

  const arrType = [
    'text', 'password', 'Email',
    'number', 'tel', 'url',
  ]

  const checkType = (arr, elem) => {
    return arr.indexOf(elem) !== -1;
  }

  return (
    <>
      <label
        className={`form__input-label ${modifierLabel ? modifierLabel : ''}`}
        htmlFor={`${idInput}`}>{textLabel}</label>
      <input
        id={`${idInput}`}
        name={idInput}
        className={`form__input ${modifier ? modifier : ''}`}
        style={{ color: type === 'password' ? "#EE3465" : 'none' }}
        required={required}
        placeholder={placeholder}
        spellCheck={`${type === 'text' ? 'true' : 'false'}`}
        type={String(type) && checkType(arrType, type) ? type : 'text'}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={onChange}
        onFocus={onFocus}
        value={value}
      />
      <span
        className={`${idInput}-input-error form__input-error ${textMessageError
          ? 'form__input-error_active'
          : ''}`
        }
      >
        {textMessageError}
      </span>
    </>
  )
}

export default FormInput;
