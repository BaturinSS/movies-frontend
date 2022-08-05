import './LinkAnchor.css';

import React from "react";

function LinkAnchor({
  config, selector,
}) {
  const { href, title } = config;
  return (
    <>
      <a href={href} className={selector}>{title}</a>
    </>
  )
}

export default LinkAnchor;