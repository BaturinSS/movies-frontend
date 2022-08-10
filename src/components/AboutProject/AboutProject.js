import "./AboutProject.css";

import React from "react";

import AboutProjectItem from "../../components/AboutProjectItem/AboutProjectItem";
import AboutProjectScheme from "../AboutProjectScheme/AboutProjectScheme";

function AboutProject({ config }) {
  const { title, list, scheme } = config;

  return (
    <>
      <section id="aboutProject" className='about-project default__block'>
        <h2 id='aboutProjectTitle'
          className='about-project__about default__title'>{title}</h2>
        <ul id='aboutProjectList' className='about-project__list'>
          {list.map(item => {
            return (
              <AboutProjectItem
                key={item.id}
                config={item}
              />
            );
          })}
        </ul>
        <article id='aboutProjectScheme' className='about-project__scheme'>
          {scheme.map(item => {
            return (
              <AboutProjectScheme
                key={item.id}
                config={item}
                modifier={item.id === 2 ? 'about-project__stage_type_color' : ''}
              />
            );
          })}
        </article>
      </section>
    </>
  )
}

export default AboutProject;
