import './GreetingMessage.css';
import React from "react";
import { Link } from 'react-router-dom';

function GreetingMessage({ message, addLink }) {
  return (
    <>
      <section className='main__message'>
        <h3 className='main__title main__title_message'>{message}</h3>
        {addLink && <Link
          className={'main__link'}
          to={'/movies'}
        >
          {'Поиск фильмов'}
        </Link>}
      </section>
    </>
  )
}

export default GreetingMessage;
