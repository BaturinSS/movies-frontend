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
import GreetingMessage from '../../../components/GreetingMessage/GreetingMessage';

function MoviesSavedPage({
  listMovies,
  setListMovies,
  configMovies,
  listMoviesSaved,
  setListMoviesSaved,
  isOneDownload,
  setIsOneDownload,
  setLinkImage,
  setTitleImage,
  setIsOpenPopup,
  setTrailerLink,
}) {
  const {
    isEN, isDownload, messageMoviesSaved,
    messageMoviesList, handleClickLikes,
    handleSubmitFormMoviesSaved, newListMoviesSaved,
  } = useMovies(
    listMovies, setListMovies, listMoviesSaved,
    setListMoviesSaved, isOneDownload, setIsOneDownload,
  );

  return (
    <>
      <Header>
        <HeaderLogin config={configHeaderLogin} />
      </Header>
      <Main>
        <SearchForm
          isChange={true}
          configMovies={configMovies}
          nameForm={'FormSearchMoviesSaved'}
          clickSubmitButton={handleSubmitFormMoviesSaved} />
        {(isDownload)
          ? <Preloader modifier={'preloader_main'} />
          : (checkedLengthArray(newListMoviesSaved))
            ? <GreetingMessage
              message={messageMoviesSaved} />
            : <MoviesCardList
              isEN={isEN}
              setTrailerLink={setTrailerLink}
              setIsOpenPopup={setIsOpenPopup}
              setLinkImage={setLinkImage}
              setTitleImage={setTitleImage}
              messageMoviesList={messageMoviesList}
              moviesList={newListMoviesSaved}
              handleClickLikes={handleClickLikes}
              modifierButton={'movies-list__button_delete'} />}
      </Main>
      <Footer config={configFooter} />
    </>
  )
}

export default MoviesSavedPage;
