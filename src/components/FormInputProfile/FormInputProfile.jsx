import './FormInputProfile.css';
import React from "react";
import { appointTypeInput } from '../../utils/utils';

function FormInputProfile({
  config,
  isPermission,
  onChange,
  value,
  isName,
  onFocus,
  autoComplete,
  errors,
  isEmail,
  currentUser,
  setIsDoubleName,
  setIsDoubleEmail,
}) {
  const {
    idInput, placeholder, textLabel, nameInput,
    required, typeInput, minLength, maxLength,
  } = config;

  const { name: userName, email: userEmail } = currentUser;
  const textMessageError = errors[`${idInput}`];
  const inputRef = React.useRef();

  React.useEffect(() => {
    const inputValue = inputRef.current.value;

    if (nameInput === 'Name') {
      setIsDoubleName(inputValue === userName);
    } else if (nameInput === 'Email') {
      setIsDoubleEmail(inputValue === userEmail);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <>
      {isName && < span
        className={`${idInput}-input-error form__input-error
        ${(textMessageError) ? 'form__input-error_active' : ''}`}
      >
        {textMessageError}
      </span>}
      <label
        className={`form__input-label form__input-label_profile`}
        style={(isPermission) ? {} : { pointerEvents: 'none', cursor: 'default' }}
        htmlFor={`${idInput}`}
      >
        {textLabel}
        <input ref={inputRef}
          id={`${idInput}`}
          name={nameInput}
          className={`form__input form__input_profile`}
          required={required}
          placeholder={placeholder}
          spellCheck={`${(typeInput === 'text') ? true : false}`}
          type={appointTypeInput(typeInput)}
          minLength={minLength}
          maxLength={maxLength}
          autoComplete={autoComplete}
          onChange={onChange}
          onFocus={onFocus}
          value={value}
          readOnly={!isPermission} />
      </label>
      {isEmail && < span
        className={`${idInput}-input-error form__input-error
        ${(textMessageError) ? 'form__input-error_active' : ''}`}
      >
        {textMessageError}
      </span>}
    </>
  )
}

export default FormInputProfile;
