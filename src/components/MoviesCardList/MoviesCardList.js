import './MoviesCardList.css';

import React from "react";

import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList({
  isCards, modifierActiveButton, modifierButton, children,
}) {
  return (
    <>
      <section className="movies-list">
        <ul className="movies-list__cards">
          {isCards.map(card => {
            return (
              <MoviesCard
                key={card.id}
                card={card}
                modifierButton={modifierButton}
                modifierActiveButton={modifierActiveButton}
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