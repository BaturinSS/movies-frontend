import './FormSubmit.css';

import { Link } from 'react-router-dom';

function FormSubmit({
  classNameBlock,
  textMessageError,
  config,
}) {
  const {
    textButton, textLink,
    pathLink, textQuestion,
  } = config;
  return (
    <>
      <div
        className={`form__block ${classNameBlock}`}
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
    </>
  )
}

export default FormSubmit;