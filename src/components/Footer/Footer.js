import './Footer.css';

import React from "react";
import { Link } from 'react-router-dom';

function Footer(

) {
  return (
    <>
      <section className='footer'>
        <h2 className='footer__title'>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <article className='footer__block'>
          <nav className='footer__links'>
            <Link
              className='footer__link'
              to={{
                pathname: 'https://practicum.yandex.ru/web'
              }}
              target="_blank"
            >
              Яндекс.Практикум
            </Link>
            <Link
              className='footer__link'
              to={{
                pathname: 'https://github.com/BaturinSS'
              }}
              target="_blank"
            >
              Github
            </Link>
            <Link
              className='footer__link'
              to={{
                pathname: 'https://t.me/Sergey32323'
              }}
              target="_blank"
            >
              Telegram
            </Link>
          </nav>
          <p className='footer__copyright'>
            ©2020
          </p>
        </article>
      </section>
    </>
  )
}

export default Footer;
