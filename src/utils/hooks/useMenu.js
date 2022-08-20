import { useState } from "react";
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

const useMenu = () => {
  const [isOpenCloseMenu, setIsOpenCloseMenu] = useState(false);

  const openMenu = () => {
    setIsOpenCloseMenu(true);
    disablePageScroll();
  }

  const closeMenu = () => {
    setIsOpenCloseMenu(false);
    enablePageScroll();
  }

  return { isOpenCloseMenu, openMenu, closeMenu }
}

export default useMenu;
