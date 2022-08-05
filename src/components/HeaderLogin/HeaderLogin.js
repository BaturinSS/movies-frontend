import './HeaderLogin.css';

import React from "react";

import LinkNavReact from '../../components/LinkNavReact/LinkNavReact';

function HeaderLogin({
  config, closeOpenMenu, isOpenMenu,
}) {
  const { linksNav, linkProfile } = config;
  return (
    <>
      <div className="header__menu" onClick={closeOpenMenu}>
        <div className="header__menu-img" />
        <div className="header__menu-img" />
        <div className="header__menu-img" />
      </div>
      <article className={`header__items ${isOpenMenu
        ? 'header__items_opened open-popup'
        : ''}`}>
        <button className="header__close-menu close-popup"
          type="button" />
        <nav className='header__links'>
          {linksNav.map(link => {
            return (
              <LinkNavReact
                key={link.id}
                config={link}
                closeOpenMenu={closeOpenMenu}
                selector={'header__link-login'}
                selectorActive={'header__active-link'}
              />
            );
          })}
        </nav>
        <LinkNavReact
          config={linkProfile}
          closeOpenMenu={closeOpenMenu}
          selector={'header__link-login header__link-login_indent'}
          selectorActive={'header__active-link'}
          selectorIcon={'header__logo'}
        />
      </article>
    </>
  )
}
export default HeaderLogin;