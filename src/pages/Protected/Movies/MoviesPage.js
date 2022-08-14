import React from "react";

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Main from '../../../components/Main/Main';

import HeaderLogin from '../../../components/HeaderLogin/HeaderLogin';
import SearchForm from '../../../components/SearchForm/SearchForm';
import MoviesCardList from '../../../components/MoviesCardList/MoviesCardList';
import MoviesAddButton from '../../../components/MoviesAddButton/MoviesAddButton';
import Popup from '../../../components/Popup/Popup';
import ImageZoom from '../../../components/ImageZoom/ImageZoom';

import configHeaderLogin from '../../../utils/config/configHeaderLogin';
import configFooter from '../../../utils/config/configFooter';

import moviesList from "../../../utils/moviesList.json"

function MoviesPage() {
  const addMovies = () => {
    console.log('MoviesPage 28 "Click addMovies"')
  }
  return (
    <>
      <Header>
        <HeaderLogin config={configHeaderLogin} />
      </Header>
      <Main>
        <SearchForm />
        <MoviesCardList
          isCards={moviesList}
          modifierActiveButton={'movies-list__button_active'}
          handleClickPlayVideo={addMovies}
          handleClickZoomImage={addMovies}
        >
          <MoviesAddButton addMovies={addMovies} />
        </MoviesCardList>
      </Main>
      <Footer config={configFooter} />
      {/* <Popup
        isOpenPopup={false}
      >
        <ImageZoom
          titleImage={titleImage}
          linkImage={linkImage}
          isLinkImage={isLinkImage}
        />
      </Popup> */}
    </>
  )
}

export default MoviesPage;