import './HeaderNotLogin.css';

import React from "react";

import LinkReact from '../LinkReact/LinkReact';

function HeaderNotLogin({ config }) {
  const { links, linkEnter } = config;
  return (
    <>
      <nav className='header__group'>
        {links.map(link => {
          return (
            <LinkReact
              key={link.id}
              config={link}
              selector={'header__link'}
            />
          );
        })}
        <LinkReact
          config={linkEnter}
          selector={'header__link header__link_enter'}
        />
      </nav>
    </>
  )
}
export default HeaderNotLogin;
