import React from "react";
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

const useMenu = () => {
  const [isOpenCloseMenu, setIsOpenCloseMenu] = React.useState(false);

  function openMenu() {
    setIsOpenCloseMenu(true);
    disablePageScroll();
  };

  function closeMenu() {
    setIsOpenCloseMenu(false);
    enablePageScroll();
  };

  return { isOpenCloseMenu, openMenu, closeMenu };
}

export default useMenu;
