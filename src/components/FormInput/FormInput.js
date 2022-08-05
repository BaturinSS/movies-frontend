import './FormInput.css';

import React from "react";

function FormInput({
  config, textMessageError,
  onChange, value, modifier,
  modifierLabel,
}) {
  const {
    idInput, placeholder, textLabel,
    required, type, minLength, maxLength,
  } = config;

  const arrType = [
    'text', 'password', 'email',
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
        className={`form__input ${modifier ? modifier : ''}`}
        style={{ color: type === 'password' ? "#EE3465" : 'none' }}
        required={Boolean(required) ? required : false}
        placeholder={String(placeholder) ? placeholder : false}
        spellCheck={`${type === 'text' ? 'true' : 'false'}`}
        type={String(type) && checkType(arrType, type) ? type : 'text'}
        minLength={`${Number(minLength) ? minLength : false}`}
        maxLength={`${Number(maxLength) ? maxLength : false}`}
        autoComplete={type === 'password' ? 'on' : 'off'}
        onChange={onChange}
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