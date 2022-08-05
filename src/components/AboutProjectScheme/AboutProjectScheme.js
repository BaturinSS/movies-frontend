import './AboutProjectScheme.css';

import React from "react";

function AboutProjectScheme({ config, modifier }) {
  const { stage, comment, } = config;
  return (
    <>
      <article>
        <p className={`about-project__stage ${modifier
          ? modifier
          : ''}`}
        >{stage}</p>
        <span className='about-project__comment'>{comment}</span>
      </article>
    </>
  )
}
export default AboutProjectScheme;