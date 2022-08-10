import './PopupWithForm.css';

import React from "react";

import cross from '../../images/image-cross.svg';

function PopupWithForm({
  isOpen,
  title,
  children,
  isOpenPopup,
}) {
  return (
    <div className={`popup ${isOpenPopup ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" type="button">
          <img className="popup__image-cross" src={cross} alt="иконка" />
        </button>
        {children}
      </div>
    </div>
  )
}

export default PopupWithForm;