import './MoviesCard.css';

import React from "react";

import useMoviesCard from '../../components/utils/hooks/useMoviesCard'

import playImage from '../../images/movies/play_icon.svg'
import zoomImage from '../../images/movies/zoom_icon.svg'

function MoviesCard({
  card, modifierActiveButton, modifierButton,
  handleClickPlayVideo,
  handleClickZoomImage,
}) {
  const { isFavorite, time, handleClickFavorite } = useMoviesCard();

  return (
    <>
      <li className="movies-list__card">
        <figure className="movies-list__info">
          <figcaption>
            <h2 className="movies-list__title">{card.nameRU}
              <p className='movies-list__title-time'>{time(card.duration)}</p>
            </h2>
          </figcaption>
          <div className={'movies-list__block-img'}>
            <div className={'movies-list__play'}>
              <img className={'movies-list__play-img'} src={playImage} onClick={handleClickPlayVideo} alt={'Иконка воспроизведения'} />
              <img className={'movies-list__zoom-img'} src={zoomImage} onClick={handleClickZoomImage} alt={'Иконка увеличения'} />
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
          onClick={handleClickFavorite}
          type='button'
        />
      </li>
    </>
  )
}

export default MoviesCard;