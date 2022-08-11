import './FormSubmit.css';

import LinkReact from '../LinkReact/LinkReact';

function FormSubmit({ modifier, textMessageError, config, isValid }) {
  const { textButton, textQuestion } = config;

  return (
    <>
      <div className={`form__block ${modifier ? modifier : ''}`}>
        <span
          className={`formProfile-input-error form__input-error ${isValid
            ? 'form__input-error_active'
            : ''}`
          }
        >{textMessageError}
        </span>
        <button
          className={`form__submit-button ${!isValid
            ? 'form__submit-button_disabled'
            : ''}`}
          type={`submit`}
          disabled={!isValid}
        >{textButton}
        </button>
        <p className={`form__question`}>{textQuestion}
          <LinkReact config={config} selector={'form__link'} />
        </p>
      </div>
    </>
  )
}

export default FormSubmit;