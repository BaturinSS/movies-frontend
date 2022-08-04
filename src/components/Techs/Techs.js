import './Techs.css';

import React from "react";

function Techs({
  children,
}) {
  return (
    <>
      <section className='techs default__block' id="techs">
        <h2 className='techs__heading default__title'>
          Технологии
        </h2>
        <article className='techs__about'>
          <h3 className='techs__title'>
            7 технологий
          </h3>
          <p className='techs__description'>
            На курсе веб-разработки мы освоили технологии,
            которые применили в дипломном проекте.
          </p>
        </article>
        <ul className='techs__list'>
          {children}
        </ul>
      </section>
    </>
  )
}

export default Techs;