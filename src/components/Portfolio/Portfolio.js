import './Portfolio.css';

import React from "react";

import linkIcon from '../../images/aboutMe/link-icon.svg'
import LinkReact from '../LinkReact/LinkReact';

function Portfolio({ config }) {
  const { title, links } = config;
  return (
    <>
      <section className='portfolio'>
        <h3 className='portfolio__title'>{title}</h3>
        <ul className={'portfolio__links'}>
          {links.map((link, index) => {
            return (
              <li key={index + 3}>
                <LinkReact
                  config={link}
                  selector={'portfolio__link'}
                  selectorIcon={'portfolio__link-icon'}
                  linkIcon={linkIcon} />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  )
}

export default Portfolio;
