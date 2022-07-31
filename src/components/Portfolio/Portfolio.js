import './Portfolio.css';

import React from "react";
import { Link } from 'react-router-dom';

import linkIcon from '../../images/aboutMe/link-icon.svg'

function Portfolio(

) {
  return (
    <>
      <section className='portfolio'>
        <h3 className='portfolio__title'>
          Портфолио
        </h3>
        <Link
          className='portfolio__link'
          to={{
            pathname: 'https://baturinss.github.io/how-to-learn'
          }}
          target="_blank"
        >
          Статичный сайт
          <img
            className='portfolio__link-icon'
            src={linkIcon}
            alt="Иконка ссылки"
          />
        </Link>
        <Link
          className='portfolio__link'
          to={{
            pathname: 'https://baturinss.github.io/russian-travel'
          }}
          target="_blank"
        >
          Адаптивный сайт
          <img
            className='portfolio__link-icon'
            src={linkIcon}
            alt="Иконка ссылки"
          />
        </Link>
        <Link
          className='portfolio__link'
          to={{
            pathname: 'https://server-mesto.ru'
          }}
          target="_blank"
        >
          Одностраничное приложение
          <img
            className='portfolio__link-icon'
            src={linkIcon}
            alt="Иконка ссылки"
          />
        </Link>
      </section>
    </>
  )
}

export default Portfolio;