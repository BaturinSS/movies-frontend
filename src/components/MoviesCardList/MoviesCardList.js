import './MoviesCardList.css';

import React from "react";

import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList({
  isMoviesListApi, modifierActiveButton, modifierButton, children,
  handleClickPlayVideo, setIsMoviesListApi,
  handleClickZoomImage, isFavoriteMovies, setIsFavoriteMovies,
}) {
  return (
    <>
      <section className="movies-list">
        <ul className="movies-list__cards">
          {isMoviesListApi.map((card) => {
            return (
              <MoviesCard
                key={card.id}
                card={card}
                isFavoriteMovies={isFavoriteMovies}
                setIsFavoriteMovies={setIsFavoriteMovies}
                modifierButton={modifierButton}
                modifierActiveButton={modifierActiveButton}
                handleClickPlayVideo={handleClickPlayVideo}
                handleClickZoomImage={handleClickZoomImage}
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