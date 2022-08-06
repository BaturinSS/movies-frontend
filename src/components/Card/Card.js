import './Card.css';

import React from "react";

function Card({
  card, children,
}) {
  const time = () => {
    const timeMinutesFull = card.duration;
    const timeMinutes = `${(timeMinutesFull % 60) !== 0
      ? `${(timeMinutesFull % 60)}м`
      : ''}`;

    const timeHours = `${Math.trunc(timeMinutesFull / 60) === 1 && !timeMinutes
      ? `60м`
      : `${Math.trunc(timeMinutesFull / 60)}ч`}`;

    return `${timeHours} ${timeMinutes.length <= 2 && timeMinutes.length > 0
      ? `0${timeMinutes}`
      : `${timeMinutes}`}`
  }

  return (
    <>
      <li className="movies-list__card">
        <figure className="movies-list__info">
          <figcaption>
            <h2 className="movies-list__title">{card.nameRU}
              <p className=''>{time()}</p>
            </h2>
          </figcaption>
          <img
            className="movies-list__image"
            src={`https://forsazh-film-smotret.ru/wp-content${card.image.formats.thumbnail.url}`}
            alt={card.nameRU}
          />
        </figure>
        {children}
      </li>
    </>
  )
}

export default Card;