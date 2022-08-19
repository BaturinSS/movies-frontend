import './MoviesCard.css';
import React from "react";
import playImage from '../../images/movies/play_icon.svg'
import zoomImage from '../../images/movies/zoom_icon.svg'
import { timeFormat } from '../../utils/utils';
import noImage from '../../images/no_image.png';
import { BASE_URL_IMAGE } from '../../utils/constants';

function MoviesCard({
  card, modifierButton, handleClickLikes, isEN,
}) {
  return (
    <>
      <li className="movies-list__card">
        <figure className="movies-list__info">
          <figcaption>
            <h2 className="movies-list__title">{isEN && card.nameEN !== ''
              ? card.nameEN.replace(/[^A-Za-zА-Яа-яЁё0-9']+/g, ' ')
              : card.nameRU.replace(/[^A-Za-zА-Яа-яЁё0-9']+/g, ' ')}
              <p className='movies-list__title-time'>
                {timeFormat(card.duration)}</p>
            </h2>
          </figcaption>
          <div className={'movies-list__block-img'}>
            {(card.imageThumbnail || BASE_URL_IMAGE + card.image.url) &&
              <div className={'movies-list__play'}>
                <img className={'movies-list__play-img'}
                  src={playImage}
                  alt={'Иконка воспроизведения'} />
                <img className={'movies-list__zoom-img'}
                  src={zoomImage}
                  alt={'Иконка увеличения'} />
              </div>}
            <img className="movies-list__image"
              src={card.imageThumbnail || BASE_URL_IMAGE + card.image.url || noImage}
              alt={isEN && card.nameEN !== ''
                ? card.nameEN.replace(/[^A-Za-zА-Яа-яЁё0-9']+/g, ' ')
                : card.nameRU.replace(/[^A-Za-zА-Яа-яЁё0-9']+/g, ' ')
              }
            />
          </div>
        </figure>
        <button className={`movies-list__button
          ${modifierButton ? `${modifierButton}` : ''}
          ${card.id && card.like ? 'movies-list__button_active' : ''}`}
          onClick={() => handleClickLikes(card)}
          type='button' />
      </li>
    </>
  )
}

export default MoviesCard;
