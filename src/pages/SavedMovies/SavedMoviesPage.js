import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';

import MainSavedMovies from '../../components/Main/SavedMovies/MainSavedMovies';
import Preloader from '../../components/Preloader/Preloader'

function SavedMoviesPage({
  closeOpenMenu,
  isOpenMenu,
  isLoggedIn,
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