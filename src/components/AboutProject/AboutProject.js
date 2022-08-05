import './AboutProject.css';

import React from "react";

import AboutProjectItem from '../../components/AboutProjectItem/AboutProjectItem';

function AboutProject({
  config,
}) {
  const {
    title, list, scheme,
  } = config;

  return (
    <>
      <section
        id="aboutProject"
        className='about-project default__block'>
        <h2 id='aboutProjectTitle'
          className='about-project__about default__title'>{title}
        </h2>
        <ul id='aboutProjectList'
          className='about-project__list'
        >
          {list.map(item => {
            return (
              <AboutProjectItem
                key={item.id}
                config={item}
              />
            );
          })}
        </ul>
        <article
          id='aboutProjectScheme'
          className='about-project__scheme'>
          <article>
            <p className='about-project__stage'>
              1 неделя
            </p>
            <span className='about-project__comment'>
              Back-end
            </span>
          </article>
          <article>
            <p
              className='about-project__stage about-project__stage_type_color'>
              4 недели
            </p>
            <span className='about-project__comment'>
              Front-end
            </span>
          </article>
        </article>
      </section>
    </>
  )
}

export default AboutProject;