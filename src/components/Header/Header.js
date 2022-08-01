import './Header.css';

import React from "react";

import HeaderTypical from '../HeaderTypical/HeaderTypical';
import HeaderLogoLink from '../HeaderLogoLink/HeaderLogoLink';

function Header({
  isLoggedIn,
  closeOpenMenu,
  isOpenMenu,
}) {
  return (
    <>
      <HeaderTypical
        isLoggedIn={isLoggedIn}
        closeOpenMenu={closeOpenMenu}
        isOpenMenu={isOpenMenu}
      >
        <HeaderLogoLink />
      </HeaderTypical >
    </>
  )
}

export default Header;
