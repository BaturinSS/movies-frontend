import './LinkAnchor.css';

import React from "react";
// import {Link} from "react-router-dom";

import { Link as LinkScroll } from "react-scroll";

function LinkAnchor({
  config, selector,
}) {
  const { href, title } = config;
  return (
    <>
      {/*<a href={href} className={selector}>{title}</a>*/}
      <LinkScroll
        className={selector}
        activeClass=''
        to={href.substring(2)}
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        {title}
      </LinkScroll>
    </>
  )
}

export default LinkAnchor;