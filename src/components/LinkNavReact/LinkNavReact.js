import "./LinkNavReact.css";

import React from "react";
import { NavLink } from "react-router-dom";

function LinkNavReact({
  config, handleClickLink,
  selectorActive, selectorIcon,
  modifier, selector,
}) {
  const { to, addIcon, title, exact } = config;
  return (
    <>
      <NavLink
        to={to}
        exact={`${exact ? exact : false}`}
        onClick={handleClickLink}
        className={`${selector} ${modifier ? modifier : ''}`}
        activeClassName={selectorActive}
      >{title}
        {addIcon && <div className={selectorIcon}></div>}
      </NavLink>
    </>
  )
}

export default LinkNavReact;
