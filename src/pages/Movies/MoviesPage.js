import React from "react";

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Main from '../../components/Main/Main';

import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import MainMovies from '../../components/Main/Movies/MainMovies';
import Preloader from '../../components/Preloader/Preloader';

import configHeaderLogin from "../../components/utils/config/configHeaderLogin";
import configFooter from "../../components/utils/config/configFooter";

function MoviesPage({
  isLoggedIn,
  closeOpenMenu,
  isOpenMenu,
  isCards,
}) {
  //! Убрать loggedIn после реализации защиты роутов
  return (
    <>
      {false && <Preloader />}
      <Header>
        {isLoggedIn && <HeaderLogin
          config={configHeaderLogin}
          closeOpenMenu={closeOpenMenu}
          isOpenMenu={isOpenMenu}
        />}
      </Header>
      <MainMovies
        isCards={[]}
      />
      <Footer
        config={configFooter}
      />
    </>
  )
}

export default MoviesPage;