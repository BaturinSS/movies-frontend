import './HeaderAuth.css';

import React from "react";

function HeaderAuth({
  currentPath,
}) {
  return (
    <>
      <h1
        className='header__title'>{
          currentPath === '/sign-in'
            ? 'Добро пожаловать!'
            : 'Рады видеть!'
        }
      </h1>
    </>
  )
}

export default HeaderAuth;
