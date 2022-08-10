import './Popup.css';

import React from "react";

import cross from '../../images/image-cross.svg';

function Popup({
  isOpen,
  title,
  children,
  isOpenPopup,
}) {
  return (
    <div className={`popup ${isOpenPopup ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" type="button">
          {isOpenPopup && <img className="popup__image-cross" src={cross} alt="иконка"/>}
        </button>
        {children}
      </div>
    </div>
  )
}

export default Popup;