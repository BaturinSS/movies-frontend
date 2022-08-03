import './Form.css';

import InputForm from '../InputForm/InputForm';
import { Link } from 'react-router-dom';

function Form({
  onSubmitForm,
  idForm,
  textButton,
  textQuestion,
  textLink,
  pathLink,
  isEmail,
  setIsEmail,
  isName,
  setIsName,
}) {
  const signInPath = pathLink === '/sign-in';

  const textMessageError = 'Что-то пошло не так...';

  const handleEmailChange = (event) => {
    setIsEmail(event.target.value);
  }

  const handleNameChange = (event) => {
    setIsName(event.target.value);
  }

  return (
    <>
      <form
        id={`${idForm}`}
        className={`form`}
        onSubmit={onSubmitForm}
        noValidate
      >
        <div className={`form__inputs`}>
          {signInPath && <InputForm
            idInput={`inputName`}
            textLabel={`Имя`}
            required={true}
            type={`text`}
            minLength={`2`}
            maxLength={`30`}
            activeMessageError={false}
            value={isName}
            onChange={handleNameChange}
          />}
          <InputForm
            idInput={`inputEmail`}
            textLabel={`E-mail`}
            required={true}
            type={`email`}
            activeMessageError={false}
            value={isEmail}
            onChange={handleEmailChange}
          />
          < InputForm
            idInput={`inputPassword`}
            textLabel={`Пароль`}
            required={true}
            type={`password`}
            minLength={`6`}
            maxLength={`30`}
            activeMessageError={true}
            textMessageError={textMessageError}
          />
        </div>
        <div
          className={`form__block ${!signInPath ? 'form__block_auth' : ''}`}
        >
          <button
            className={`form__submit-button ${!textMessageError ? 'form__submit-button_disabled' : ''}`}
            type={`submit`}
          >
            {textButton}
          </button>
          <p className={`form__question`}>{textQuestion}
            <Link to={pathLink} className={`form__link`}>{textLink}</Link>
          </p>
        </div>
      </form>
    </>
  )
}

export default Form;