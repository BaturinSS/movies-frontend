import React from "react";

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';

import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
import MoviesAddButton from "../../components/MoviesAddButton/MoviesAddButton";

import configHeaderLogin from "../../components/utils/config/configHeaderLogin";
import configFooter from "../../components/utils/config/configFooter";

function MoviesPage({
  closePopup,
  openPopup,
  isOpenMenu,
  isCards,
}) {
  const addMovies = () => {
    console.log('Click addMovies')
  }
  return (
    <>
      <Header>
        <HeaderLogin
          config={configHeaderLogin}
          closePopup={closePopup}
          openPopup={openPopup}
          isOpenMenu={isOpenMenu} />
      </Header>
      <Main>
        <SearchForm />
        <MoviesCardList
          isCards={isCards}
          modifierActiveButton={'movies-list__button_active'}
        >
          <MoviesAddButton addMovies={addMovies} />
        </MoviesCardList>
      </Main>
      <Footer config={configFooter} />
    </>
  )
}

export default MoviesPage;