import './FormSubmitProfile.css';

import { textMessageError } from '../utils/constants';

function FormSubmitProfile({
  outputProfile,
  isPermission,
  editProfile,
}) {
  return (
    <>
      <div className={`form__block form__block_profile`}>
        {!isPermission && <span
          className={`formProfile-input-error form__input-error ${textMessageError
            ? 'form__input-error_active'
            : ''}`
          }
        >
          {textMessageError}
        </span>}
        {isPermission && <button
          className={'form__button'}
          type={`submit`}
          onClick={editProfile}
        >
          {'Редактировать'}
        </button>}
        {!isPermission && <button
          className={`form__submit-button ${!textMessageError ? 'form__submit-button_disabled' : ''}`}
          type={`submit`}
          style={{ marginTop: `${!isPermission ? '20px' : '0'}` }}
          onClick={editProfile}
        // disabled={textMessageError !== undefined}
        >
          {'Сохранить'}
        </button>}
        {isPermission && <button
          className={`form__button`}
          type={`button`}
          style={{ color: '#EE3465' }}
          onClick={outputProfile}
        >
          {`Выйти из аккаунта`}
        </button>}
      </div>
    </>
  )
}

export default FormSubmitProfile;