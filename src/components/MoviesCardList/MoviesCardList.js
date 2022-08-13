import './MoviesCardList.css';

import React from "react";

import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList({
  isCards, modifierActiveButton, modifierButton, children,
  handleClickPlayVideo,
  handleClickZoomImage,
}) {
  return (
    <>
      <section className="movies-list">
        <ul className="movies-list__cards">
          {isCards.map((card, i) => {
            return (
              <MoviesCard
                key={i + 12}
                card={card}
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