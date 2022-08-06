import React from "react";

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';

import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesList from "../../components/MoviesList/MoviesList";
import MoviesAddButton from "../../components/MoviesAddButton/MoviesAddButton";

import configHeaderLogin from "../../components/utils/config/configHeaderLogin";
import configFooter from "../../components/utils/config/configFooter";

function MoviesPage({
  isLoggedIn,
  closePopup,
  openPopup,
  isOpenMenu,
  isCards,
}) {
  const addMovies = () => {
    console.log('Click addMovies')
  }
  //! Убрать loggedIn после реализации защиты роутов
  return (
    <>
      <Header>
        {isLoggedIn && <HeaderLogin
          config={configHeaderLogin}
          closePopup={closePopup}
          openPopup={openPopup}
          isOpenMenu={isOpenMenu} />}
      </Header>
      <Main>
        <SearchForm />
        <MoviesList
          isCards={isCards}
          modifierActiveButton={'movies-list__button_active'}
        >
          <MoviesAddButton addMovies={addMovies} />
        </MoviesList>
      </Main>
      <Footer config={configFooter} />
    </>
  )
}

export default MoviesPage;