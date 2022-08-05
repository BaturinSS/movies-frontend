import React from "react";
import { NavLink } from "react-router-dom";

function LinkNavReact({
  config,
  closeOpenMenu,
  selector,
  selectorActive,
  selectorIcon,
}) {
  const { to, addIcon, title } = config;

  return (
    <>
      <NavLink
        to={to}
        onClick={closeOpenMenu}
        className={selector}
        activeClassName={selectorActive}
      >
        {title}
        {addIcon && <div className={selectorIcon}></div>}
      </NavLink>
    </>
  )
}

export default LinkNavReact;