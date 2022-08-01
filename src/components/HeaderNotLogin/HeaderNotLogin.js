import './HeaderNotLogin.css';

import React from "react";
import { Link } from "react-router-dom";

function HeaderNotLogin() {
  return (
    <>
      <nav className='header__group'>
        <Link to='/sign-up' className='header__link'>Регистрация</Link>
        <Link to='/sign-in' className='header__link header__link_enter'>Войти</Link>
      </nav>
    </>
  )
}

export default HeaderNotLogin;
