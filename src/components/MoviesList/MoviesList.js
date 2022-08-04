import './MoviesList.css';

import Card from '../Card/Card'

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
              />
            );
          })}
        </ul>
      </section>
    </>
  )
}

export default MoviesList;