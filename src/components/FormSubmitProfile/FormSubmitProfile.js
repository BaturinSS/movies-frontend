import './FormSubmitProfile.css';

function FormSubmitProfile({
  outputProfile, isPermission, editProfile,
  errors, isValid, isDownload,
}) {
  const textMessageErrorProfile = errors;
  return (
    <>
      <div className={`form__block form__block_profile`}>
        {isPermission && <span
          style={{ marginBottom: '15px' }}
          className={`formProfile-input-error form__input-error ${!isValid
            ? 'form__input-error_active'
            : ''}`
          }
        >{textMessageErrorProfile}
        </span>}
        {!isPermission && <button
          className={'form__button'}
          type={`button`}
          onClick={editProfile}
        >{'Редактировать'}
        </button>}
        {isPermission && <button
          className={`form__submit-button ${!isValid
            ? 'form__submit-button_disabled'
            : ''}`}
          type={`submit`}
          style={{ marginTop: `${!isPermission ? '0' : '-50px'}` }}
          disabled={!isValid}
        >{`${isDownload ? 'Сохраняю...' : 'Сохранить'}`}
        </button>}
        {!isPermission && <button
          className={`form__button`}
          type={`button`}
          onClick={outputProfile}
        >{`${isDownload ? 'Выхожу...' : 'Выйти из аккаунта'}`}
        </button>}
      </div>
    </>
  )
}

export default FormSubmitProfile;
