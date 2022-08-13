import './FormInputProfile.css';

import React from "react";

function FormInputProfile({
  config, isPermission, onChange, value, isName,
  onFocus, autoComplete, errors, isEmail, ref,
}) {
  const {
    idInput, placeholder, textLabel, name,
    required, type, minLength, maxLength,
  } = config;

  const textMessageError = errors[`${idInput}`];

  const arrType = [
    'password', 'Email',
    'number', 'tel', 'url',
  ]
  const checkType = (arr, elem) => {
    return arr.indexOf(elem) !== -1;
  }

  return (
    <>
      {isName && !isEmail && < span
        className={`${idInput}-input-error form__input-error ${textMessageError
          ? 'form__input-error_active'
          : ''}`
        }>
        {textMessageError}
      </span>}
      <label
        className={`form__input-label form__input-label_profile`}
        style={isPermission ? {} : { pointerEvents: 'none', cursor: 'default' }}
        htmlFor={`${idInput}`}>{textLabel}
        <input
          id={`${idInput}`}
          name={name}
          className={`form__input form__input_profile`}
          style={{ color: type === 'password' ? "#EE3465" : 'none' }}
          required={required}
          placeholder={placeholder}
          spellCheck={`${type === 'text' ? true : false}`}
          type={String(type) && checkType(arrType, type) ? type : 'text'}
          minLength={minLength}
          maxLength={maxLength}
          autoComplete={autoComplete}
          onChange={onChange}
          onFocus={onFocus}
          value={value}
          readOnly={!isPermission}
        />
      </label>
      {
        isEmail && !isName && < span
          className={`${idInput}-input-error form__input-error ${textMessageError
            ? 'form__input-error_active'
            : ''}`
          }
        >
          {textMessageError}
        </span>
      }
    </>
  )
}

export default FormInputProfile;