import './AboutProject.css';

import React from "react";

function AboutProject(

) {
  return (
    <>
      <section className='about-project default__block' id="aboutProject">
        <h2 className='about-project__about default__title'>
          О проекте
        </h2>
        <ul className='about-project__list'>
          <li className='about-project__item'>
            <h3 className='about-project__title'>
              Дипломный проект включал 5 этапов
            </h3>
            <p className='about-project__description'>
              Составление плана, работу над бэкендом, вёрстку,
              добавление функциональности и финальные доработки.
            </p>
          </li>
          <li className='about-project__item'>
            <h3 className='about-project__title'>
              На выполнение диплома ушло 5 недель
            </h3>
            <p className='about-project__description'>
              У каждого этапа был мягкий и жёсткий дедлайн,
              которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <article className='about-project__scheme'>
          <article>
            <p className='about-project__stage'>
              1 неделя
            </p>
            <span className='about-project__comment'>
              Back-end
            </span>
          </article>
          <article>
            <p className='about-project__stage about-project__stage_type_color'>
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