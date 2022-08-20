import "./FormInput.css";
import React from "react";
import { appointTypeInput } from '../../utils/utils';

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
    idInput, placeholder, textLabel, nameInput,
    required, typeInput, minLength, maxLength,
  } = config;

  const textMessageError = errors[`${idInput}`];

  const validColorPassword =
    (typeInput === 'password') && textMessageError;

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
        name={nameInput}
        className={`form__input ${(modifier) ? modifier : ''}
        ${(validColorPassword) ? 'form__input_error-password' : ''}`}
        required={required}
        placeholder={placeholder}
        spellCheck={`${(typeInput === 'text') ? true : false}`}
        type={appointTypeInput(typeInput)}
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
