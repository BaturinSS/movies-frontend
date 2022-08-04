import './MainMovies.css';

import SearchForm from '../../SearchForm/SearchForm'
import Preloader from '../../Preloader/Preloader'

function MainMovies({

}) {
  return (
    <>
      <section className={`main`}>
        <SearchForm
        />
        {false && <Preloader />}

      </section>
    </>
  )
}

export default MainMovies;