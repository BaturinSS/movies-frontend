import './MainMovies.css';

import SearchForm from '../../SearchForm/SearchForm';
import MoviesList from '../../MoviesList/MoviesList';

function MainMovies({
  isCards,
}) {
  return (
    <>
      <section className={`main`}>
        <SearchForm
        />
        <MoviesList
          isCards={isCards}
        />
      </section>
    </>
  )
}

export default MainMovies;