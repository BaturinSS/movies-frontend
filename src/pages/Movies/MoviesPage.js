import MainMovies from '../../components/Main/Movies/MainMovies';

function MoviesPage({
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
      <MainMovies

      />
      <Footer />
    </>
  )
}

export default MoviesPage;