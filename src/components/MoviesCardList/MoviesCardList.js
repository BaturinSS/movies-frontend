import './MoviesCardList.css';
import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList({
  children,
  isEN,
  moviesList,
  handleClickLikes,
  modifierButton,
  messageMoviesList,
}) {
  return (
    <>
      <section className="movies-list">
        <span className='movies-list__message'>{messageMoviesList}</span>
        <ul className="movies-list__cards">
          {moviesList.map((film) => {
            return (
              <MoviesCard
                key={film._id || film.id}
                isEN={isEN}
                card={film}
                modifierButton={modifierButton}
                handleClickLikes={handleClickLikes} />
            );
          })}
        </ul>
        {children}
      </section>
    </>
  )
}

export default MoviesCardList;
