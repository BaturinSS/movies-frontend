import './HeaderLogin.css';

import React from "react";

import LinkNavReact from '../../components/LinkNavReact/LinkNavReact';

function HeaderLogin({
  config, closePopup, openPopup, isOpenMenu,
}) {
  const { linksNav, linkProfile } = config;
  return (
    <>
      <div className="header__menu" onClick={openPopup}>
        <div className="header__menu-img" />
        <div className="header__menu-img" />
        <div className="header__menu-img" />
      </div>
      <article className={`header__items ${isOpenMenu
        ? 'header__items_opened popup_opened'
        : ''}`}>
        <button className="header__close-menu popup_close"
          type="button" />
        <nav className='header__links'>
          {linksNav.map(link => {
            return (
              <LinkNavReact
                key={link.id}
                config={link}
                closeOpenMenu={closePopup}
                selector={'header__link-login'}
                selectorActive={'header__active-link'}
              />
            );
          })}
        </nav>
        <LinkNavReact
          config={linkProfile}
          closeOpenMenu={closePopup}
          selector={'header__link-login header__link-login_indent'}
          selectorActive={'header__active-link'}
          selectorIcon={'header__logo'}
        />
      </article>
    </>
  )
}
export default HeaderLogin;