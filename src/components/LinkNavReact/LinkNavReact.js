import './LinkNavReact.css';

import React from "react";
import { NavLink } from "react-router-dom";

function LinkNavReact({
  config, closeOpenMenu, selector,
  selectorActive, selectorIcon,
}) {
  const { to, addIcon, title, exact } = config;
  return (
    <>
      <NavLink
        to={to}
        exact={`${exact ? exact : false}`}
        onClick={closeOpenMenu}
        className={selector}
        activeClassName={selectorActive}
      >{title}
        {addIcon && <div className={selectorIcon}></div>}
      </NavLink>
    </>
  )
}
export default LinkNavReact;