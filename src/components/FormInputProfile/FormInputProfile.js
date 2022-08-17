import './FormInputProfile.css';

import React from "react";

function FormInputProfile({
  config, isPermission, onChange, value, isName,
  onFocus, autoComplete, errors, isEmail, currentUser,
  setIsDoubleName, setIsDoubleEmail
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
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (name === 'Name') {
      setIsDoubleName(inputRef.current.value === currentUser.name);
    } else if (name === 'Email') {
      setIsDoubleEmail(inputRef.current.value === currentUser.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])


  return (
    <>
      {isName && < span
        className={`${idInput}-input-error form__input-error ${textMessageError
          ? 'form__input-error_active'
          : ''}`
        }>{textMessageError}</span>}
      <label
        className={`form__input-label form__input-label_profile`}
        style={isPermission ? {} : { pointerEvents: 'none', cursor: 'default' }}
        htmlFor={`${idInput}`}>{textLabel}
        <input ref={inputRef}
          id={`${idInput}`}
          name={name}
          className={`form__input form__input_profile`}
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
      {isEmail && < span
        className={`${idInput}-input-error form__input-error ${textMessageError
          ? 'form__input-error_active'
          : ''}`}
      >{textMessageError}</span>}
    </>
  )
}

export default FormInputProfile;