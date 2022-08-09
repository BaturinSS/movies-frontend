import React from "react";

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';

import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";

import configHeaderLogin from "../../components/utils/config/configHeaderLogin";
import configFooter from "../../components/utils/config/configFooter";


function SavedMoviesPage({
  isCards,
  closePopup,
  openPopup,
  isOpenMenu, deleteCardFavorite,
}) {
  return (
    <>
      <Header>
        <HeaderLogin
          config={configHeaderLogin}
          closePopup={closePopup}
          openPopup={openPopup}
          isOpenMenu={isOpenMenu}
        />
      </Header>
      <Main>
        <SearchForm />
        <MoviesCardList
          isCards={isCards}
          modifierButton={'movies-list__button_delete'}
        />
      </Main>
      <Footer
        config={configFooter}
      />
    </>
  )
}

export default SavedMoviesPage;