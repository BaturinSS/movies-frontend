import "./AboutProject.css";
import React from "react";
import AboutProjectItem from "../AboutProjectItem/AboutProjectItem";
import AboutProjectScheme from "../AboutProjectScheme/AboutProjectScheme";

function AboutProject({
  config,
}) {
  const { title, list, scheme } = config;

  return (
    <>
      <section className='about-project default__block' id="aboutProject" >
        <h2 className='about-project__about default__title'
          id='aboutProjectTitle'
        >
          {title}
        </h2>
        <ul className='about-project__list' id='aboutProjectList' >
          {list.map(item => {
            return (
              <AboutProjectItem
                key={item.id}
                config={item}
              />
            );
          })}
        </ul>
        <article className='about-project__scheme' id='aboutProjectScheme' >
          {scheme.map(item => {
            return (
              <AboutProjectScheme
                key={item.id}
                config={item}
                modifier={(item.id === 2) ? 'about-project__stage_type_color' : ''}
              />
            );
          })}
        </article>
      </section>
    </>
  )
}

export default AboutProject;
