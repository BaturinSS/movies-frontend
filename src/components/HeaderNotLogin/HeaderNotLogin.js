import "./HeaderNotLogin.css";

import React from "react";

import LinkReact from "../LinkReact/LinkReact";

function HeaderNotLogin({ config }) {
  const { links, linkEnter } = config;
  const selector = 'header__link';
  return (
    <>
      <nav className='header__nav'>
        {links.map(link => {
          return (
            <LinkReact
              key={link.id}
              config={link}
              selector={selector}
            />
          );
        })}
        <LinkReact
          config={linkEnter}
          selector={selector}
          modifier={'header__link_enter'}
        />
      </nav>
    </>
  )
}

export default HeaderNotLogin;
