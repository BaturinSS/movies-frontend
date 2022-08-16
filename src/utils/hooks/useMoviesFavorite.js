import React from "react";
import { checkedLengthArray } from "../utils";
import MainApi from "../api/MainApi";
import { NODE_ENV } from "../constants";

const useMoviesFavorite = () => {
  const [isDownload, setIsDownload] = React.useState(false);
  const [isFavoriteMovies, setIsFavoriteMovies] = React.useState([]);
  const [message, setMessage] = React.useState('');

  const api = new MainApi({ NODE_ENV: NODE_ENV });

  React.useEffect(() => {
    if (checkedLengthArray(isFavoriteMovies)) {
      api
        .getMovies()
        .then(({ films, message }) => {
          setMessage(message);
          setIsFavoriteMovies(films);
          console.log(films, message)
        })
        .catch(console.log())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearchFavorite = (evt) => {
    setIsDownload(true);
    evt.preventDefault();
    setIsDownload(false);
  }

  return {
    handleSearchFavorite, isDownload, message,
    isFavoriteMovies, setIsFavoriteMovies,
  }
}

export default useMoviesFavorite;