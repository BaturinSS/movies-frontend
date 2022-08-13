import "./FormSubmit.css";

import React from "react";

import LinkReact from "../LinkReact/LinkReact";

function FormSubmit({ modifier, textMessageError, config, isValid, isDownload }) {
  const { textButton, textQuestion, textDownload } = config;

  return (
    <>
      <div className={`form__block ${modifier ? modifier : ''}`}>
        <span
          className={`form-input-error form__input-error ${textMessageError
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
        >{`${isDownload ? textDownload : textButton}`}
        </button>
        <p className={`form__question`}>{textQuestion}
          <LinkReact config={config} selector={'form__link'} />
        </p>
      </div>
    </>
  )
}

export default FormSubmit;
