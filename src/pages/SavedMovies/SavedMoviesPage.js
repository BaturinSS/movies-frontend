import MainSavedMovies from '../../components/Main/SavedMovies/MainSavedMovies';

function SavedMoviesPage({
  closeOpenMenu,
  isOpenMenu,
  isLoggedIn,
  Header,
  Footer,
}) {
  return (
    <>
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