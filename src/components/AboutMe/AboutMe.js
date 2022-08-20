import "./AboutMe.css";
import React from "react";
import Portfolio from "../../components/Portfolio/Portfolio";
import LinkReact from "../LinkReact/LinkReact";

function AboutMe({
  config,
}) {
  const {
    title, name, profession, description, links, portfolio,
  } = config;

  return (
    <>
      <section id="aboutMe" className='about-me default__block'>
        <h2 className='about-me__title default__title'>{title}</h2>
        <article className='about-me__info'>
          <div className='about-me__image' />
          <article className='about-me__group'>
            <h3 className='about-me__name'>{name}</h3>
            <p className='about-me__profession'>{profession}</p>
            <p className='about-me__description'>{description}</p>
          </article>
          <article className='about-me__links'>
            {links.map((link, index) => {
              return (
                <LinkReact
                  key={index + 10}
                  config={link}
                  selector={'about-me__link'}
                />
              );
            })}
          </article>
        </article>
        <Portfolio key={125} config={portfolio} />
      </section>
    </>
  )
}

export default AboutMe;
