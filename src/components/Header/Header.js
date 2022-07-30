import './Header.css';

import React, { useState } from "react";
import { Link, Route } from "react-router-dom";

function Header(

) {
  return (
    <>
      <section className='header'>
        <Link to='/' className='header__logo'></Link>
        <nav className='header__group'>
          <Link to='/sign-up' className='header__link'>Регистрация</Link>
          <Link to='/sign-in' className='header__link header__link_enter'>Войти</Link>
        </nav>
      </section>
    </>
  )
}

export default Header;
