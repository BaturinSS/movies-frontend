import './MoviesCardList.css';

import React from "react";

import Card from '../MoviesCard/MoviesCard'

function MoviesCardList({
  isCards, modifierActiveButton, modifierButton, children,
}) {
  return (
    <>
      <section className="movies-list">
        <ul className="movies-list__cards">
          {isCards.map(card => {
            return (
              <Card
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