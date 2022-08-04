import './Card.css';

function Card({
  card,
}) {
  return (
    <>
      <li className="movies-list__card">
        <figure className="elements__rectangle">
          <figcaption>
            <h2
              className="elements__title"
            >
              {card.nameRU}
              <p className=''
              >
                {card.duration}
              </p>
            </h2>
          </figcaption>
          <img
            className="elements__mask-group"
            src={`https://forsazh-film-smotret.ru/wp-content${card.image.formats.thumbnail.url}`}
            alt={card.nameRU}
          />
        </figure>
        <button
          type="button"
          className={``}
        >

        </button>
      </li>
    </>
  )
}

export default Card;