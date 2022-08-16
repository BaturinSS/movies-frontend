import React from "react";

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Main from '../../../components/Main/Main';

import HeaderLogin from '../../../components/HeaderLogin/HeaderLogin';
import SearchForm from '../../../components/SearchForm/SearchForm';
import MoviesCardList from '../../../components/MoviesCardList/MoviesCardList';

import configHeaderLogin from '../../../utils/config/configHeaderLogin';
import configFooter from '../../../utils/config/configFooter';
import useMovies from "../../../utils/hooks/useMovies";
import useMoviesFavorite from "../../../utils/hooks/useMoviesFavorite";
import Preloader from "../../../components/Preloader/Preloader";
import { checkedLengthArray } from "../../../utils/utils";

function MoviesSavedPage() {
  const { } = useMovies();

  const {
    handleSearchFavorite, isDownload, message,
    isFavoriteMovies, setIsFavoriteMovies,
  } = useMoviesFavorite();
  return (
    <>
      <Header>
        <HeaderLogin config={configHeaderLogin} />
      </Header>
      <Main>
        <SearchForm submitButton={handleSearchFavorite} />
        {isDownload
          ? <Preloader modifier={'preloader_main'} />
          : checkedLengthArray([])
            ? <h1>{message}</h1>
            : <MoviesCardList
              isMoviesListApi={isFavoriteMovies}
              isFavoriteMovies={isFavoriteMovies}
              setIsFavoriteMovies={setIsFavoriteMovies}
              modifierActiveButton={'movies-list__button_active'}
            >
            </MoviesCardList>}
      </Main>
      {/* <Main> */}
      {/* <SearchForm /> */}
      {/* <MoviesCardList
          isCards={isFavoriteMovies}
          modifierButton={'movies-list__button_delete'}
        /> */}
      {/* </Main> */}
      <Footer
        config={configFooter}
      />
    </>
  )
}

export default MoviesSavedPage;