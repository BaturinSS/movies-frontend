import './MoviesCard.css';
import React from "react";
import playImage from '../../images/movies/play_icon.svg'
import zoomImage from '../../images/movies/zoom_icon.svg'
import { timeFormat } from '../../utils/utils';
import noImage from '../../images/no_image.png';

function MoviesCard({
  card, modifierButton, handleClickLikes,
}) {
  return (
    <>
      <li className="movies-list__card">
        <figure className="movies-list__info">
          <figcaption>
            <h2 className="movies-list__title">{card.nameRU}
              <p className='movies-list__title-time'>
                {timeFormat(card.duration)}</p>
            </h2>
          </figcaption>
          <div className={'movies-list__block-img'}>
            {card.imageThumbnail && <div className={'movies-list__play'}>
              <img className={'movies-list__play-img'}
                src={playImage}
                alt={'Иконка воспроизведения'} />
              <img className={'movies-list__zoom-img'}
                src={zoomImage}
                alt={'Иконка увеличения'} />
            </div>}
            <img className="movies-list__image"
              src={card.imageThumbnail || noImage}
              alt={card.nameRU}
            />
          </div>
        </figure>
        <button className={`movies-list__button
          ${modifierButton ? `${modifierButton}` : ''}
          ${card.like ? 'movies-list__button_active' : ''}`}
          onClick={() => handleClickLikes(card)}
          type='button' />
      </li>
    </>
  )
}

export default MoviesCard;
