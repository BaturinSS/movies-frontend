import React from "react";
import moviesApi from "../api/MoviesApi";
import MainApi from "../api/MainApi";
import { TEXT_MESSAGE_NO_SEARCH, NODE_ENV } from "../constants";
import { checkedLengthArray } from "../utils";

const useMovies = (
  isMoviesListApi, setIsMoviesListApi,
  isFavoriteMovies, setIsFavoriteMovies,
) => {
  const [isDownload, setIsDownload] = React.useState(false);
  const [isMessage, setIsMessage] = React.useState(TEXT_MESSAGE_NO_SEARCH);

  const mainApi = new MainApi({ NODE_ENV: NODE_ENV });

  React.useEffect(() => {

    mainApi
      .getMovies()
      .then(({ films }) => {
        setIsFavoriteMovies(films);
      })
      .catch((err) => {
        err.then(({ message }) => {
          isMessage(message);
        });
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmitButtonSearch = (evt) => {
    console.log('старт')
    setIsDownload(true);
    evt.preventDefault();
    if (checkedLengthArray(isMoviesListApi)) {
      moviesApi
        .download()
        .then((moviesList) => {
          setIsMoviesListApi(moviesList);
          console.log('загрузка')
        })
        .catch((err) => {
          err.then(({ message }) => {
            setIsMessage(message);
          });
        })
        .finally(() => setIsDownload(false));
    } else { setIsDownload(false) };
  }

  const handleSearchFavorite = (evt) => {
    setIsDownload(true);
    evt.preventDefault();
    setIsDownload(false);
  }

  return {
    isDownload,
    isMoviesListApi,
    isMessage, setIsMessage,
    isFavoriteMovies, setIsFavoriteMovies,
    handleSubmitButtonSearch, handleSearchFavorite,
  }
}

export default useMovies;