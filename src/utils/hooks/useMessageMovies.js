import React from "react";
import { TEXT_MESSAGE_NO_SEARCH } from "../constants";
import { TEXT_MESSAGE_NO_FAVORITE } from "../constants";

function useMessageMovies() {
  const [messageMovies, setMessageMovies] = React.useState(TEXT_MESSAGE_NO_SEARCH);
  const [messageMoviesSaved, setMessageMoviesSaved] = React.useState(TEXT_MESSAGE_NO_FAVORITE);
  const [messageMoviesList, setMessageMoviesList] = React.useState('');

  function showMessageMovies(message) {
    setMessageMovies(message);
    setTimeout(() => setMessageMovies(TEXT_MESSAGE_NO_SEARCH), 5000);
  };

  function showMessageMoviesSaved(message) {
    setMessageMoviesSaved(message);
    setTimeout(() => setMessageMoviesSaved(TEXT_MESSAGE_NO_FAVORITE), 5000);
  }

  function showMessageMoviesList(message, resetMessage) {
    setMessageMoviesList(message);
    setTimeout(() => setMessageMoviesList(resetMessage), 5000);
  }

  return {
    showMessageMovies, showMessageMoviesSaved, showMessageMoviesList,
    messageMovies, messageMoviesSaved, messageMoviesList,
  };
};

export default useMessageMovies;
