import './Header.css';

import React from "react";

import LogoLink from '../../components/LogoLink/LogoLink';
import HeaderAuth from './HeaderAuth/HeaderAuth';

function Header({
  children,
  isLoggedIn,
  textGreetings,
  isSignIn,
}) {
  return (
    <>
      <section className={`header ${isSignIn ? 'header_auth' : ''}`}>
        <LogoLink />
        {children}

        {!isLoggedIn && isSignIn && <HeaderAuth
          textGreetings={textGreetings}
        />}
      </section>
    </>
  )
}

export default Header;