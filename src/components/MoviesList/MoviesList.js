import './MoviesList.css';

import React from "react";

import Card from '../Card/Card'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import CheckboxSearch from '../SubstitutionCheckbox/CheckboxSearch/CheckboxSearch';

function MoviesList({
  isCards,
}) {
  return (
    <>
      <section className="movies-list">
        <ul className="movies-list__cards">
          {isCards.slice().reverse().map(card => {
            return (
              <Card
                key={card.id}
                card={card}
              >
                <FilterCheckbox
                  label={''}
                  checked={false}>
                  <CheckboxSearch />
                </FilterCheckbox>
              </Card>
            );
          })}
        </ul>
      </section>
    </>
  )
}

export default MoviesList;