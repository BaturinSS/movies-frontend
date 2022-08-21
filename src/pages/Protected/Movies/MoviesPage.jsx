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
  listMovies,
  setListMovies,
  listMoviesSaved,
  setListMoviesSaved,
  configMovies,
  setConfigMovies,
  isOneDownload,
  setIsOneDownload,
  setLinkImage,
  setTitleImage,
  setIsOpenPopup,
  setTrailerLink,
}) {
  const {
    isEN, isDownload, messageMovies, handleClickLikes,
    handleSubmitFormMovies, handleClickAddMovies,
    finalityListMovies, messageMoviesList,
    isButtonDisabled,
  } = useMovies(
    listMovies, setListMovies, listMoviesSaved,
    setListMoviesSaved, configMovies, setConfigMovies,
    isOneDownload, setIsOneDownload, setLinkImage,
    setTitleImage,
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
        {(isDownload)
          ? <Preloader modifier={'preloader_main'} />
          : (checkedLengthArray(finalityListMovies))
            ? <GreetingMessage
              message={messageMovies} />
            : <MoviesCardList
              isEN={isEN}
              setTrailerLink={setTrailerLink}
              setIsOpenPopup={setIsOpenPopup}
              messageMoviesList={messageMoviesList}
              moviesList={finalityListMovies}
              handleClickLikes={handleClickLikes}
              setLinkImage={setLinkImage}
              setTitleImage={setTitleImage}
            >
              <MoviesAddButton
                isButtonDisabled={isButtonDisabled}
                handleClickAddMovies={handleClickAddMovies} />
            </MoviesCardList>}
      </Main>
      <Footer config={configFooter} />
    </>
  )
}

export default MoviesPage;
