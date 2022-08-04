import MainSavedMovies from '../../components/Main/SavedMovies/MainSavedMovies';
import Preloader from '../../components/Preloader/Preloader'

function SavedMoviesPage({
  closeOpenMenu,
  isOpenMenu,
  isLoggedIn,
  Header,
  Footer,
}) {
  return (
    <>
      {true && <Preloader />}
      <Header
        isLoggedIn={isLoggedIn}
        closeOpenMenu={closeOpenMenu}
        isOpenMenu={isOpenMenu}
      />
      <MainSavedMovies />
      <Footer />
    </>
  )
}

export default SavedMoviesPage;