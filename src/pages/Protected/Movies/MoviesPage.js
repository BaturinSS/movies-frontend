import React from "react";
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Main from '../../../components/Main/Main';
import HeaderLogin from '../../../components/HeaderLogin/HeaderLogin';
import SearchForm from '../../../components/SearchForm/SearchForm';
import MoviesCardList from '../../../components/MoviesCardList/MoviesCardList';
import MoviesAddButton from '../../../components/MoviesAddButton/MoviesAddButton';
import Preloader from '../../../components/Preloader/Preloader'
import configHeaderLogin from '../../../utils/config/configHeaderLogin';
import configFooter from '../../../utils/config/configFooter';
import useMovies from "../../../utils/hooks/useMovies";
import GreetingMessage from "../../../components/GreetingMessage/GreetingMessage";
import { checkedLengthArray } from "../../../utils/utils";

function MoviesPage({
  listMovies, setListMovies,
  listMoviesSaved, setListMoviesSaved,
  configMovies, setConfigMovies,
}) {

  const {
    isEN,
    isDownload,
    messageMovies,
    handleClickLikes,
    handleSubmitFormMovies,
    handleClickAddMovies,
    newListMovies,
    messageMoviesList,
  } = useMovies(
    listMovies, setListMovies,
    listMoviesSaved, setListMoviesSaved,
    configMovies, setConfigMovies,
  );
  return (
    <>
      <Header>
        <HeaderLogin config={configHeaderLogin} />
      </Header>
      <Main>
        <SearchForm
          configMovies={configMovies}
          clickSubmitButton={handleSubmitFormMovies}
          nameForm={'FormSearchMovies'} />
        {isDownload
          ? <Preloader modifier={'preloader_main'} />
          : checkedLengthArray(newListMovies)
            ? <GreetingMessage
              message={messageMovies}
            />
            : <MoviesCardList
              isEN={isEN}
              messageMoviesList={messageMoviesList}
              moviesList={newListMovies}
              handleClickLikes={handleClickLikes}
            >
              <MoviesAddButton handleClickAddMovies={handleClickAddMovies} />
            </MoviesCardList>}
      </Main>
      <Footer config={configFooter} />
    </>
  )
}

export default MoviesPage;