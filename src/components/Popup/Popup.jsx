import './Popup.css';
import React from "react";
import cross from '../../images/popup/image-cross.svg';

function Popup({
  children,
  isOpenPopup,
  setIsOpenPopup,
  keydownEnter,
  disablePageScroll,
  enablePageScroll,
  modifierContainer,
}) {
  React.useEffect(() => {
    if (isOpenPopup) {
      disablePageScroll();
    } else return enablePageScroll();

    function handleOverlay(event) {
      if (event.target.classList.contains('popup_opened') ||
        event.target.classList.contains('popup__image-cross')) {
        setIsOpenPopup(false);
        enablePageScroll();
      };
    };

    function handleKeyDown(event) {
      if (event.key === 'Enter') keydownEnter();
      if (event.key === 'Escape') setIsOpenPopup(false);
      enablePageScroll();
    };

    document.addEventListener("mousedown", handleOverlay);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOverlay);
      document.removeEventListener('keydown', handleKeyDown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenPopup]);

  return (
    <div
      className={`popup ${(isOpenPopup) ? 'popup_opened' : ''}`}>
      <div className={`popup__container ${(modifierContainer) ? `${modifierContainer}` : ''}`}>
        <button className="popup__close" type="button">
          {isOpenPopup && <img className="popup__image-cross"
            src={cross} alt="иконка" />}
        </button>
        {children}
      </div>
    </div >
  )
}

export default Popup;
