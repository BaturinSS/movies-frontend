import React from "react";
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Main from '../../../components/Main/Main';
import HeaderLogin from '../../../components/HeaderLogin/HeaderLogin';
import SearchForm from '../../../components/SearchForm/SearchForm';
import MoviesCardList from '../../../components/MoviesCardList/MoviesCardList';
import MoviesAddButton from '../../../components/MoviesAddButton/MoviesAddButton';
import Popup from '../../../components/Popup/Popup';
// import ImageZoom from '../../../components/ImageZoom/ImageZoom';
import Preloader from '../../../components/Preloader/Preloader'
import configHeaderLogin from '../../../utils/config/configHeaderLogin';
import configFooter from '../../../utils/config/configFooter';
import useMovies from "../../../utils/hooks/useMovies";

function MoviesPage() {
  const [isOpenPopup, setIsOpenPopup] = React.useState();

  const {
    isDownload, isMoviesListApi, setIsMoviesListApi,
    handleSubmitButtonSearch, isFavoriteMovies, setIsFavoriteMovies,
    checkedLengthArray, message,
  } = useMovies();

  const addMovies = () => {
    console.log('click add movies');
  };

  const keydownEnter = () => {
    console.log('keydown Enter');
  };

  return (
    <>
      <Header>
        <HeaderLogin config={configHeaderLogin} />
      </Header>
      <Main>
        <SearchForm submitButton={handleSubmitButtonSearch} />
        {isDownload
          ? <Preloader modifier={'preloader_main'} />
          : checkedLengthArray(isMoviesListApi)
            ? <h1>{message}</h1>
            : <MoviesCardList
              isMoviesListApi={isMoviesListApi}
              isFavoriteMovies={isFavoriteMovies}
              setIsFavoriteMovies={setIsFavoriteMovies}
              modifierActiveButton={'movies-list__button_active'}
              handleClickPlayVideo={addMovies}
              handleClickZoomImage={addMovies}
            >
              <MoviesAddButton addMovies={addMovies} />
            </MoviesCardList>}
      </Main>
      <Footer config={configFooter} />
      <Popup
        isOpenPopup={isOpenPopup}
        setIsOpenPopup={setIsOpenPopup}
        keydownEnter={keydownEnter}
      >
        {/* <ImageZoom
          titleImage={titleImage}
          linkImage={linkImage}
          isLinkImage={isLinkImage}
        /> */}
      </Popup>
    </>
  )
}

export default MoviesPage;