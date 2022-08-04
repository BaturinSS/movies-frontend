import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';

import MainMovies from '../../components/Main/Movies/MainMovies';
import Preloader from '../../components/Preloader/Preloader'

function MoviesPage({
  closeOpenMenu,
  isOpenMenu,
  isLoggedIn,
  isCards,
}) {
  return (
    <>
      {false && <Preloader />}
      <Header
        isLoggedIn={isLoggedIn}
        closeOpenMenu={closeOpenMenu}
        isOpenMenu={isOpenMenu}
      />
      <MainMovies
        isCards={isCards}
      />
      <Footer />
    </>
  )
}

export default MoviesPage;