import './FormProfile.css';

import React from "react";

function FormProfile({
  children, onSubmitFormProfile,
  exitEditProfile, isPermission,
}) {
  return (
    <>
      <form
        id='formProfile'
        className='form form_profile'
        onSubmit={onSubmitFormProfile}
        noValidate
      >
        {children}
        {isPermission && <button
          type='button'
          className='form__button-back'
          onClick={exitEditProfile}>
          {'Выход'}
        </button>}
      </form>
    </>
  )
}

export default FormProfile;