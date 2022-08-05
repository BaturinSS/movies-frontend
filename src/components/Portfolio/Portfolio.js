import './Portfolio.css';

import React from "react";

import linkIcon from '../../images/aboutMe/link-icon.svg'
import LinkReact from '../LinkReact/LinkReact';

function Portfolio({
  config,
}) {
  const {
    title, links,
  } = config;
  return (
    <>
      <section className='portfolio'>
        <h3 className='portfolio__title'>{title}</h3>
        {links.map(link => {
          return (
            <LinkReact
              key={link.id}
              config={link}
              selector={'portfolio__link'}
              selectorIcon={'portfolio__link-icon'}
              linkIcon={linkIcon}
            />
          );
        })}
      </section>
    </>
  )
}

export default Portfolio;