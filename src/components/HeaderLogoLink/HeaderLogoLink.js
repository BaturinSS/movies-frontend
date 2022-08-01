import './HeaderLogoLink.css';

import React from "react";
import { Link } from "react-router-dom";

function HeaderLogoLink() {
  return (
    <>
      <Link to='/' className='header__logo-link'></Link>
    </>
  )
}

export default HeaderLogoLink;
