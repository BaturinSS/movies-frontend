import './Header.css';
import React from "react";
import LogoLink from '../LogoLink/LogoLink';

function Header({
  children,
  modifier,
}) {

  return (
    <>
      <header className={`header ${(modifier) ? modifier : ''}`}>
        <LogoLink />
        {children}
      </header>
    </>
  )
}

export default Header;
