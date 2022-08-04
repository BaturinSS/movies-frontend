import MainMovies from '../../components/Main/Movies/MainMovies';
import Preloader from '../../components/Preloader/Preloader'

function MoviesPage({
  closeOpenMenu,
  isOpenMenu,
  isLoggedIn,
  Header,
  Footer,
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
      />
      <Footer />
    </>
  )
}

export default MoviesPage;