import './MoviesCardList.css';
import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList({
  children,
  isEN,
  setTrailerLink,
  moviesList,
  handleClickLikes,
  modifierButton,
  messageMoviesList,
  setLinkImage,
  setTitleImage,
  setIsOpenPopup,
}) {

  return (
    <>
      <section className="movies-list">
        <span className='movies-list__message'>{messageMoviesList}</span>
        <ul className="movies-list__cards">
          {moviesList.map((movie) => {
            return (
              <MoviesCard
                key={movie._id || movie.id}
                isEN={isEN}
                card={movie}
                setTrailerLink={setTrailerLink}
                setIsOpenPopup={setIsOpenPopup}
                setLinkImage={setLinkImage}
                setTitleImage={setTitleImage}
                modifierButton={modifierButton}
                handleClickLikes={handleClickLikes}
              />
            );
          })}
        </ul>
        {children}
      </section>
    </>
  )
}

export default MoviesCardList;
