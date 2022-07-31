import './NavTab.css';

import React from "react";
import { Link } from "react-router-dom";

function NavTab(

) {
  return (
    <>
      <nav className='nav-tab'>
        <Link
          to='/#aboutProject'
          className='nav-tab__link'
        >
          О проекте
        </Link>
        <Link
          to='/#techs'
          className='nav-tab__link '
        >
          Технологии
        </Link>
        <Link
          to='/#aboutMe'
          className='nav-tab__link'
        >
          Студент
        </Link>
      </nav>
    </>
  )
}

export default NavTab;