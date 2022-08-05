import './Header.css';

import React from "react";

import LogoLink from '../../components/LogoLink/LogoLink';

function Header({
  children,
  modifier,
}) {
  return (
    <>
      <section className={`header ${modifier ? modifier : ''}`}>
        <LogoLink />
        {children}
      </section>
    </>
  )
}

export default Header;