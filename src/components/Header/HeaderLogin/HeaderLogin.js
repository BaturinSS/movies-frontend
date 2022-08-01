import './HeaderLogin.css';

import React from "react";
import { NavLink } from "react-router-dom";

function HeaderLogin({
  closeOpenMenu,
  isOpenMenu,
}) {
  return (
    <>
      <div
        className="header__menu"
        onClick={closeOpenMenu}
      >
        <div className="header__menu-img"></div>
        <div className="header__menu-img"></div>
        <div className="header__menu-img"></div>
      </div>
      <article
        className={`header__items ${isOpenMenu ? 'header__items_opened' : ''}`}
      >
        <button
          className="header__close-menu"
          type="button"
        ></button>
        <nav className='header__links'>
          <NavLink
            to='/'
            exact={true}
            onClick={closeOpenMenu}
            className='header__link-login'
            activeClassName='header__active-link'
          >
            Главная
          </NavLink>
          <NavLink
            to='/movies'
            onClick={closeOpenMenu}
            className='header__link-login'
            activeClassName='header__active-link'
          >
            Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            onClick={closeOpenMenu}
            className='header__link-login'
            activeClassName='header__active-link'
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <NavLink
          to='/profile'
          onClick={closeOpenMenu}
          className='header__link-login header__link-login_indent'
          activeClassName='header__active-link'
        >
          Аккаунт
          <div className='header__logo'></div>
        </NavLink>
      </article>
    </>
  )
}

export default HeaderLogin;