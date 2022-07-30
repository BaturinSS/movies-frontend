import './AboutProject.css';

import React, { useState } from "react";
import { Link, Route } from "react-router-dom";

function AboutProject(

) {
  return (
    <>
      <section className='about-project'>
        <h2 className='about-project__about'>
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
        <div className='about-project__scheme'>
          <div>
            <p className='about-project__stage'>
              1 неделя
            </p>
            <span className='about-project__comment'>
              Back-end
            </span>
          </div>
          <div>
            <p className='about-project__stage about-project__stage_type_color'>
              4 недели
            </p>
            <span className='about-project__comment'>
              Front-end
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutProject;