import './FormSubmit.css';

import LinkReact from '../LinkReact/LinkReact';

function FormSubmit({ modifier, textMessageError, config }) {
  const { textButton, textQuestion } = config;

  return (
    <>
      <div className={`form__block ${modifier ? modifier : ''}`}>
        <button
          className={`form__submit-button ${!textMessageError
            ? 'form__submit-button_disabled'
            : ''}`}
          type={`submit`}
        >
          {textButton}
        </button>
        <p className={`form__question`}>{textQuestion}
          <LinkReact config={config} selector={'form__link'} />
        </p>
      </div>
    </>
  )
}

export default FormSubmit;