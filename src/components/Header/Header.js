import './Header.css';

import React from "react";

import LogoLink from '../../components/LogoLink/LogoLink';

function Header({ children, modifier }) {
  return (
    <>
      <header className={`header ${modifier ? modifier : ''}`}>
        <LogoLink />
        {children}
      </header>
    </>
  )
}
export default Header;