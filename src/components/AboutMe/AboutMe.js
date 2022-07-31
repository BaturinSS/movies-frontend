import './AboutMe.css';

import React from 'react';
import { Link } from 'react-router-dom';

import Portfolio from '../Portfolio/Portfolio';

function AboutMe(

) {
  return (
    <>
      <section className='about-me default__block' id="aboutMe">
        <h2 className='about-me__title default__title'>
          Студент
        </h2>
        <article className='about-me__info'>
          <div className='about-me__image' /><div />
          <article className='about-me__group'>
            <h3 className='about-me__name'>
              Виталий
            </h3>
            <p className='about-me__profession'>
              Фронтенд-разработчик, 30 лет
            </p>
            <p className='about-me__description'>
              Я родился и живу в Саратове, закончил факультет
              экономики СГУ. У меня есть жена и дочь. Я люблю
              слушать музыку, а ещё увлекаюсь бегом. Недавно начал
              кодить. С 2015 года работал в компании «СКБ Контур».
              После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
          </article>
          <article className='about-me__links'>
            <Link
              className='about-me__link'
              to={{ pathname: "https://t.me/Sergey32323" }}
              target="_blank"
            >
              Telegram
            </Link>
            <Link
              className='about-me__link'
              to={{ pathname: "https://github.com/BaturinSS" }}
              target="_blank"
            >
              Github
            </Link>
          </article>
        </article>
        <Portfolio />
      </section>
    </>
  )
}

export default AboutMe;