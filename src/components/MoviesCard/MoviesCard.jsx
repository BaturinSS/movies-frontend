import './MoviesCard.css';
import React from "react";
import { Link } from "react-router-dom";
import playImage from '../../images/movies/play_icon.svg'
import zoomImage from '../../images/movies/zoom_icon.svg'
import { timeFormat } from '../../utils/utils';
import noImage from '../../images/cardMovies/no_image.png';
import { BASE_URL_IMAGE, REGEX_TEST_TITLE_CARD } from '../../utils/constants';

function MoviesCard({
  isEN,
  card,
  modifierButton,
  handleClickLikes,
  setLinkImage,
  setTitleImage,
  setIsOpenPopup,
  setTrailerLink,
}) {
  const refImage = React.useRef();
  const {
    imageSmall, image, trailerLink,
    duration, imageThumbnail, nameEN, nameRU,
  } = card;

  function handleClickZoomImage() {
    const elImage = refImage.current;

    let linkImage = imageSmall
      ? imageSmall
      : BASE_URL_IMAGE + image.url;

    setIsOpenPopup(true);
    setLinkImage(linkImage);
    setTitleImage(elImage.alt);
    setTrailerLink(trailerLink);
  };

  function titleCard() {
    return isEN && (nameEN !== '')
      ? nameEN.replace(REGEX_TEST_TITLE_CARD, ' ')
      : nameRU.replace(REGEX_TEST_TITLE_CARD, ' ');
  };

  return (
    <>
      <li className="movies-list__card">
        <figure className="movies-list__info">
          <figcaption>
            <h2 className="movies-list__title">{titleCard()}
              <p className='movies-list__title-time'>{timeFormat(duration)}</p>
            </h2>
          </figcaption>
          <div className={'movies-list__block-img'}>
            {(imageThumbnail || (BASE_URL_IMAGE + image.url)) &&
              <div className={'movies-list__play'}>
                <Link to={{ pathname: `${trailerLink}` }}
                  target={'_blank'}
                >
                  <img className={'movies-list__play-img'}
                    src={playImage}
                    alt={'Иконка воспроизведения'} />
                </Link>
                <img
                  className={'movies-list__zoom-img'}
                  onClick={handleClickZoomImage}
                  src={zoomImage}
                  alt={'Иконка увеличения'} />
              </div>}
            <img ref={refImage}
              className="movies-list__image"
              src={imageSmall || (BASE_URL_IMAGE + image.url) || noImage}
              alt={titleCard()} />
          </div>
        </figure>
        <button className={`movies-list__button
          ${(modifierButton) ? `${modifierButton}` : ''}
          ${(card.id && card.like) ? 'movies-list__button_active' : ''}`}
          onClick={() => handleClickLikes(card)}
          type='button' />
      </li>
    </>
  )
}

export default MoviesCard;
