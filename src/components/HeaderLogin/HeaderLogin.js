import "./HeaderLogin.css";
import React from "react";
import LinkNavReact from "../../components/LinkNavReact/LinkNavReact";
import useMenu from "../../utils/hooks/useMenu"

function HeaderLogin({ config }) {
  const { linksNav, linkProfile } = config;
  const { isOpenCloseMenu, openMenu, closeMenu } = useMenu();

  const selectorActiveLink = 'header__active-link';
  const selectorLink = 'header__link-login';
  return (
    <>
      <div className="header__menu" onClick={openMenu}>
        <div className="header__menu-img" />
        <div className="header__menu-img" />
        <div className="header__menu-img" />
      </div>
      <article className={`header__items
      ${isOpenCloseMenu
          ? 'header__items_opened'
          : ''}`}
        onClick={closeMenu}>
        <button className="header__close-menu"
          type="button" />
        <nav className='header__links'>
          {linksNav.map(link => {
            return (
              <LinkNavReact
                key={link.id}
                config={link}
                selector={selectorLink}
                selectorActive={selectorActiveLink} />
            );
          })}
        </nav>
        <LinkNavReact
          config={linkProfile}
          selector={selectorLink}
          selectorActive={selectorActiveLink}
          modifier={'header__link-login_indent'}
          selectorIcon={'header__logo'} />
      </article>
    </>
  )
}

export default HeaderLogin;
