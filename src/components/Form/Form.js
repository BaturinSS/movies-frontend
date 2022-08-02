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
}) {
  const signInPath = pathLink === '/sign-in';

  return (
    <>
      <form
        id={`${idForm}`}
        className={`form`}
        onSubmit={onSubmitForm}
        noValidate
      >
        <div className={`form__inputs`}>
          <InputForm
            idInput={`inputName`}
            textLabel={`Имя`}
            required={true}
            type={`text`}
            minLength={`2`}
            maxLength={`30`}
            activeMessageError={false}
          />
          <InputForm
            idInput={`inputEmail`}
            textLabel={`E-mail`}
            required={true}
            type={`email`}
            activeMessageError={false}
          />
          {signInPath && < InputForm
            idInput={`inputPassword`}
            textLabel={`Пароль`}
            required={true}
            type={`password`}
            minLength={`6`}
            maxLength={`30`}
            activeMessageError={true}
            textMessageError={`Что-то пошло не так...`}
          />}
        </div>
        <div
          className={`form__block ${!signInPath ? 'form__block_auth' : ''}`}
        >
          <button
            className={`form__submit-button`}
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