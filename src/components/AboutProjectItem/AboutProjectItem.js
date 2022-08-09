import './AboutProjectItem.css';

import React from "react";

function AboutProjectItem({ config }) {
  const { title, description, } = config;
  return (
    <>
      <li className='about-project__item'>
        <h3 className='about-project__title'>{title}</h3>
        <p className='about-project__description'>{description}</p>
      </li>
    </>
  )
}
export default AboutProjectItem;