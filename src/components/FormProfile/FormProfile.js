import './FormProfile.css';

import { useState, useEffect } from "react";

function FormProfile({
  isEmail,
  setIsEmail,
  isName,
  setIsName,
  outputProfile,
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
        noValidate
      >
        <div className={`form__inputs`}>
          <label
            className={`form__input-label form__input`}
            htmlFor={`inputNameProfile`}>{`Имя`}
            <input
              id={`inputNameProfile`}
              className={`form__input`}
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
            className={`form__input-label`}
            htmlFor={`inputEmailProfile`}>{`E-mail`}
            <input
              id={`inputEmailProfile`}
              className={`form__input`}
              required={`required`}
              type={`email`}
              onChange={handleEmailChange}
              value={isPermission ? isEmail : isNewEmail}
              readOnly={isPermission}
            />
          </label>
        </div>
        <div
          className={`form__block`}
        >
          <button
            className={`form__submit-button`}
            type={`button`}
            onClick={editProfile}
          >
            {`${isPermission ? 'Редактировать' : 'Сохранить'}`}
          </button>
          <button
            className={`form__submit-button`}
            type={`button`}
            onClick={outputProfile}
          >
            {`Выйти из аккаунта`}
          </button>
        </div>
      </form>
    </>
  )
}

export default FormProfile;