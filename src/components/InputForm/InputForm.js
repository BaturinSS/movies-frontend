import './InputForm.css';

function InputForm({
  idInput,
  textMessageError,
  textLabel,
  placeholder,
  required,
  type,
  minLength,
  maxLength,
}) {
  const arrType = [
    'text', 'password', 'email',
    'number', 'tel', 'url',
  ]
  const checkType = (arr, elem) => {
    return arr.indexOf(elem) !== -1;
  }
  return (
    <>
      <label
        className={`form__input-label`}
        htmlFor={`${idInput}`}>{textLabel}</label>
      <input
        id={`${idInput}`}
        className={`form__input`}
        style={{ color: type === 'password' ? "#EE3465" : 'none' }}
        required={Boolean(required) ? required : false}
        placeholder={String(placeholder) ? placeholder : ''}
        spellCheck={`${type === 'text' ? 'true' : 'false'}`}
        type={String(type) && checkType(arrType, type) ? type : 'text'}
        minLength={`${Number(minLength) ? minLength : ''}`}
        maxLength={`${Number(maxLength) ? maxLength : ''}`}
        autoComplete={type === 'password' ? 'on' : undefined}
      />
      <span
        className={`${idInput}-input-error form__input-error ${textMessageError
          ? 'form__input-error_active'
          : ''}`
        }
      >
        {textMessageError}
      </span>
    </>
  )
}

export default InputForm;