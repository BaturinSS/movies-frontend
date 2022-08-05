import React from "react";

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';

import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import MainSavedMovies from '../../components/Main/SavedMovies/MainSavedMovies';
import Preloader from '../../components/Preloader/Preloader'

import configHeaderLogin from "../../components/utils/config/configHeaderLogin";
import configFooter from "../../components/utils/config/configFooter";

function SavedMoviesPage({
  isLoggedIn,
  closeOpenMenu,
  isOpenMenu,
}) {
  //! Убрать loggedIn после реализации защиты роутов
  return (
    <>
      {true && <Preloader />}
      <Header>
        {isLoggedIn && <HeaderLogin
          config={configHeaderLogin}
          closeOpenMenu={closeOpenMenu}
          isOpenMenu={isOpenMenu}
        />}
      </Header>
      <MainSavedMovies />
      <Footer
        config={configFooter}
      />
    </>
  )
}

export default SavedMoviesPage;