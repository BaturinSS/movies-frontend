import './FormProfile.css';

import React from "react";

function FormProfile({
  children,
  onSubmitFormProfile,
}) {
  return (
    <>
      <form
        id={`formProfile`}
        className={`form form_profile`}
        onSubmit={onSubmitFormProfile}
        noValidate
      >
        {children}
      </form>
    </>
  )
}

export default FormProfile;