import './LinkReact.css';

import React from "react";
import { Link } from 'react-router-dom';

function LinkReact({
  config,
  selector,
}) {
  const {
    to, target, title,
  } = config;
  return (
    <>
      <Link
        className={selector}
        to={to}
        target={target}
      >
        {title}
      </Link>
    </>
  )
}

export default LinkReact;