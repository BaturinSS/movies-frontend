import "./FormInput.css";
import React from "react";
import { arrType } from '../../utils/constants';
import { checkType } from '../../utils/utils';

function FormInput({
  config,
  errors,
  onChange,
  value,
  modifier,
  modifierLabel,
  onFocus,
  autoComplete,
}) {
  const {
    idInput, placeholder, textLabel, name,
    required, type, minLength, maxLength,
  } = config;

  const textMessageError = errors[`${idInput}`];

  const validColorPassword =
    (type === 'password') && textMessageError;

  return (
    <>
      <label className={`form__input-label
      ${(modifierLabel) ? modifierLabel : ''}`}
        htmlFor={`${idInput}`}
      >
        {textLabel}
      </label>
      <input
        id={`${idInput}`}
        name={name}
        className={`form__input ${(modifier) ? modifier : ''}
        ${(validColorPassword) ? 'form__input_error-password' : ''}`}
        required={required}
        placeholder={placeholder}
        spellCheck={`${(type === 'text') ? true : false}`}
        type={(String(type) && checkType(arrType, type)) ? type : 'text'}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={onChange}
        onFocus={onFocus}
        value={value} />
      <span
        className={`${idInput}-input-error form__input-error
        ${(textMessageError) ? 'form__input-error_active' : ''}`}
      >
        {textMessageError}
      </span>
    </>
  )
}

export default FormInput;
