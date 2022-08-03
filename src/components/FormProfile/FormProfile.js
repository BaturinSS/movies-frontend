import './FormProfile.css';

import { useState, useEffect } from "react";

function FormProfile({
  isEmail,
  setIsEmail,
  isName,
  setIsName,
  outputProfile,
  textMessageError,
}) {
  const [isPermission, setIsPermission] = useState(true);
  const [isNewName, setIsNewName] = useState(isName);
  const [isNewEmail, setIsNewEmail] = useState(isEmail);



  useEffect(() => {
    setIsName(isNewName)
    setIsEmail(isNewEmail)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPermission]);

  const handleEmailChange = (event) => {
    setIsNewEmail(event.target.value);
  }

  const handleNameChange = (event) => {
    setIsNewName(event.target.value);
  }

  const editProfile = () => {
    setIsPermission(!isPermission)
  }

  return (
    <>
      <form
        id={`formProfile`}
        className={`form form_profile`}
        onSubmit={(event) => event.preventDefault()}
        noValidate
      >
        <div className={`form__inputs`}>
          <label
            className={`form__input-label form__input-label_profile`}
            htmlFor={`inputNameProfile`}>{`Имя`}
            <input
              id={`inputNameProfile`}
              className={`form__input form__input_profile`}
              required={`required`}
              type={`text`}
              spellCheck={`true`}
              minLength={`2`}
              maxLength={`30`}
              onChange={handleNameChange}
              value={isPermission ? isName : isNewName}
              readOnly={isPermission}
            />
          </label>
          <label
            className={`form__input-label form__input-label_profile`}
            htmlFor={`inputEmailProfile`}>{`E-mail`}
            <input
              id={`inputEmailProfile`}
              className={`form__input form__input_profile`}
              required={`required`}
              type={`email`}
              onChange={handleEmailChange}
              value={isPermission ? isEmail : isNewEmail}
              readOnly={isPermission}
            />
          </label>
        </div>
        <div
          className={`form__block form__block_profile`}
        >
          {!isPermission && <span
            className={`formProfile-input-error form__input-error ${textMessageError
              ? 'form__input-error_active'
              : ''}`
            }
          >
            {textMessageError}
          </span>}
          {isPermission && <button
            className={'form__button'}
            type={`submit`}
            onClick={editProfile}
          >
            {'Редактировать'}
          </button>}
          {!isPermission && <button
            className={`form__submit-button ${!textMessageError ? 'form__submit-button_disabled' : ''}`}
            type={`submit`}
            style={{ marginTop: `${!isPermission ? '20px' : '0'}` }}
            onClick={editProfile}
          // disabled={textMessageError !== undefined}
          >
            {'Сохранить'}
          </button>}
          {isPermission && <button
            className={`form__button`}
            type={`button`}
            style={{ color: '#EE3465' }}
            onClick={outputProfile}
          >
            {`Выйти из аккаунта`}
          </button>}
        </div>
      </form>
    </>
  )
}

export default FormProfile;