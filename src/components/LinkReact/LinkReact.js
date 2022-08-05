import React from "react";
import { Link } from 'react-router-dom';

function LinkReact({
  config, selector, selectorIcon, linkIcon,
}) {
  const {
    to, target, title, addIcon, alt,
  } = config;
  return (
    <>
      <Link
        className={selector}
        to={to}
        target={target}
      >
        {title}
        {addIcon && <img
          className={selectorIcon}
          src={linkIcon}
          alt={alt}
        />}
      </Link>
    </>
  )
}
export default LinkReact;