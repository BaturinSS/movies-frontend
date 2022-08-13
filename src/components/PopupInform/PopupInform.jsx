import './PopupInform.css';
import React from "react";

function PopupInform({ message, textButton, clickButton }) {
  return (
    <>
      <div className='popup__block'>
        <h1 className='popup__message'>{message}</h1>
        <button
          className="popup__button-confirm"
          type="button"
          onClick={clickButton}
        >{textButton}</button>
      </div>
    </>
  )
}

export default PopupInform;