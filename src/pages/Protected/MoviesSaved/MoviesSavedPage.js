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
import Preloader from "../../../components/Preloader/Preloader";
import { checkedLengthArray } from "../../../utils/utils";
import GreetingMessage from '../../../components/GreetingMessage/GreetingMessage'

function MoviesSavedPage({
  isMoviesListApi, setIsMoviesListApi,
  isFavoriteMovies, setIsFavoriteMovies,
}) {

  const {
    isDownload,
    isMessage,
    handleClickLikes,
    handleSearchFavorite,
  } = useMovies(
    isMoviesListApi, setIsMoviesListApi,
    isFavoriteMovies, setIsFavoriteMovies,
  );

  return (
    <>
      <Header>
        <HeaderLogin config={configHeaderLogin} />
      </Header>
      <Main>
        <SearchForm submitButton={handleSearchFavorite} />
        {isDownload
          ? <Preloader modifier={'preloader_main'} />
          : checkedLengthArray(isFavoriteMovies)
            ? <GreetingMessage
              message={isMessage}
              addLink={true}
            />
            : <MoviesCardList
              moviesList={isFavoriteMovies}
              handleClickLikes={handleClickLikes}
              modifierButton={'movies-list__button_delete'}
            />}
      </Main>
      <Footer
        config={configFooter}
      />
    </>
  )
}

export default MoviesSavedPage;
