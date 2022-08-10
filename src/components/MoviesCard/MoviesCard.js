import './MoviesCard.css';

import React, {useState} from "react";

import playImage from '../../images/movies/play_icon.svg'
import zoomImage from '../../images/movies/zoom_icon.svg'

function MoviesCard({
  card, modifierActiveButton, modifierButton,
  handleClickPlayVideo,
  handleClickZoomImage,
  }) {
  const [isFavorite, setIsFavorite] = useState(false);

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
  const addFavorites = () => {
    setIsFavorite(!isFavorite);
  }

  return (
    <>
      <li className="movies-list__card">
        <figure className="movies-list__info">
          <figcaption>
            <h2 className="movies-list__title">{card.nameRU}
              <p className='movies-list__title-time'>{time()}</p>
            </h2>
          </figcaption>
          <div className={'movies-list__block-img'}>
            <div className={'movies-list__play'}>
              <img className={'movies-list__play-img'} src={playImage} onClick={handleClickPlayVideo}/>
              <img className={'movies-list__zoom-img'} src={zoomImage} onClick={handleClickZoomImage}/>
            </div>
            <img
              className="movies-list__image"
              src={`https://forsazh-film-smotret.ru/wp-content${card.image.formats.thumbnail.url}`}
              alt={card.nameRU}
            />
          </div>
        </figure>
        <button
          className={`movies-list__button
          ${modifierButton ? `${modifierButton}` : ''}
          ${isFavorite ? `${modifierActiveButton}` : ''}`}
          onClick={addFavorites}
          type='button'
        />
      </li>
    </>
  )
}

export default MoviesCard;