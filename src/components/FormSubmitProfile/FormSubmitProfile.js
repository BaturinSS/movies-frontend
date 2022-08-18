import './FormSubmitProfile.css';

function FormSubmitProfile({
  outputProfile, isPermission, editProfile,
  error, isValid, isDownload,
}) {
  const textMessageErrorProfile = error;
  return (
    <>
      <div className={`form__block form__block_profile`}>
        {isPermission && <span
          style={{ marginBottom: '15px', marginTop: '-50px' }}
          className={`formProfile-input-error form__input-error ${isPermission
            ? 'form__input-error_active'
            : ''}`
          }>{textMessageErrorProfile}
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
          disabled={!isValid}
        >{`${isDownload ? 'Обновляю информацию...' : 'Сохранить'}`}
        </button>}
        {!isPermission && <button
          className={`form__button`}
          type={`button`}
          onClick={outputProfile}
        >{'Выйти из аккаунта'}
        </button>}
      </div>
    </>
  )
}

export default FormSubmitProfile;
