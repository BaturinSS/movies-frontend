import './LinkAnchor.css';

import React from "react";

function LinkAnchor({
  config,
}) {
  const { href, textLink } = config;
  return (
    <>
      <a href={href} className='nav-tab__link'>
        {textLink}
      </a>
    </>
  )
}

export default LinkAnchor;