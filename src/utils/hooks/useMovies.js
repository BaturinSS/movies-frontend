import React from "react";
import moviesApi from "../api/MoviesApi";
import { TEXT_MESSAGE_NO_SEARCH } from "../constants";
import { checkedLengthArray } from "../utils";

const useMovies = () => {
  const [isDownload, setIsDownload] = React.useState(false);
  const [isMoviesListApi, setIsMoviesListApi] = React.useState([]);
  const [message, setMessage] = React.useState(TEXT_MESSAGE_NO_SEARCH);

  const handleSubmitButtonSearch = (evt) => {
    setIsDownload(true);
    evt.preventDefault();
    if (checkedLengthArray(isMoviesListApi)) {
      moviesApi
        .download()
        .then((moviesList) => {
          setIsMoviesListApi(moviesList);
        })
        .catch((err) => {
          err.then(({ message }) => {
            setMessage(message);
          });
        })
        .finally(() => setIsDownload(false));
    } else { setIsDownload(false) };
  }

  return {
    isDownload, handleSubmitButtonSearch, isMoviesListApi,
    setIsMoviesListApi,
    checkedLengthArray, message,
  }
}

export default useMovies;