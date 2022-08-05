import './LogoLink.css';

import React from "react";
import { Link } from "react-router-dom";

function LogoLink() {
  return (
    <><Link to='/' className='header__logo-link'></Link></>
  )
}
export default LogoLink;
