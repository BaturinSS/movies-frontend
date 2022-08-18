import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import moviesApi from "../api/MoviesApi";
import MainApi from "../api/MainApi";
import useMoviesCard from '../../utils/hooks/useMoviesCard';
import { checkedLengthArray } from "../utils";

import {
  TEXT_MESSAGE_NO_SEARCH, NODE_ENV, TEXT_ERROR_NOT_FOUND,
  TEXT_MESSAGE_NO_FAVORITE, TEXT_ERROR,
  TEXT_ERROR_EMPTY_REQUEST, TEXT_ERROR_API_REQUEST,
  TEXT_ERROR_NO_MOVIES, REG_EX_TEXT_SEARCH,
  TEXT_ERROR_TEST_REQUEST,
} from "../constants";

const useMovies = (
  listMovies, setListMovies,
  listMoviesSaved, setListMoviesSaved,
  configMovies, setConfigMovies,
  isOneDownload, setIsOneDownload,
) => {
  const [isDownload, setIsDownload] = React.useState(false);
  const [messageMovies, setMessageMovies] = React.useState(TEXT_MESSAGE_NO_SEARCH);
  const [messageMoviesSaved, setMessageMoviesSaved] = React.useState(TEXT_MESSAGE_NO_FAVORITE);
  const [messageMoviesList, setMessageMoviesList] = React.useState('');
  const [isEN, setIsEN] = useState(false)
  const [newListMoviesSaved, setNewListMoviesSaved] = React.useState([]);
  const [newListMovies, setNewListMovies] = React.useState([]);


  const { handleClickLikes } = useMoviesCard(
    showMessageMoviesList,
    listMoviesSaved, setListMoviesSaved,
    newListMoviesSaved, setNewListMoviesSaved,
  );

  const mainApi = new MainApi({ NODE_ENV: NODE_ENV });

  const location = useLocation();

  const testTextFormat = (text) => {
    return !(REG_EX_TEXT_SEARCH.test(`${text}`));
  };

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

  React.useEffect(() => {
    if (checkedLengthArray(listMoviesSaved)) {
      mainApi
        .getMovies()
        .then(({ films }) => {
          if (checkedLengthArray(films)) return;
          setListMoviesSaved(films);
          setNewListMoviesSaved(films);
        })
        .catch((err) => {
          showMessageMoviesSaved(TEXT_ERROR);
          if (err.name === 'TypeError') {
            return console.error(err.message);
          };
          err.then(({ message }) => {
            console.error(message);
          });
        });
    } else setNewListMoviesSaved(listMoviesSaved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createdObjConfig = (form) => {
    let obj = {};
    form.forEach((el) => {
      if (el.name === 'searchQuery') obj = { ...obj, [el.name]: el.value };
      if (el.name === 'filter') obj = { ...obj, [el.name]: el.checked };
    })
    return obj;
  };

  const filterMovies = ({ filter, searchQuery }, listMovies) => {
    const regex = new RegExp(`${searchQuery.replace(/[^A-Za-zА-Яа-яЁё0-9']+/g, '')}`, "i")
    const isEN = /[A-Za-z]/i.test(searchQuery);
    setIsEN(isEN);
    let str = '';
    const newListMovies = listMovies.filter((movies) => {
      isEN
        ? str = movies.nameEN
          ? movies.nameEN.replace(/[^A-Za-zА-Яа-яЁё0-9']+/g, '')
          : movies.nameRU.replace(/[^A-Za-zА-Яа-яЁё0-9']+/g, '')
        : str = movies.nameRU
          ? movies.nameRU.replace(/[^A-Za-zА-Яа-яЁё0-9']+/g, '')
          : movies.nameEN.replace(/[^A-Za-zА-Яа-яЁё0-9']+/g, '')
      return filter
        ? movies.duration <= 40 && regex.test(str)
        : regex.test(str)
    })
    const newList = newListMovies.map((movie) => {
      const id = movie.id || movie.movieId;
      const isLike = () => {
        for (var i = 0; i < listMoviesSaved.length; i++) {
          if (listMoviesSaved[i].movieId === id) return true;
        }
        return false;
      }
      movie.like = isLike();
      return movie;
    })
    return newList;
  }

  React.useEffect(() => {
    if (location.pathname === '/movies' && Object.keys(configMovies).length !== 0)
      setNewListMovies(JSON.parse(localStorage.getItem('lastMovies')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmitFormMovies = (evt) => {
    let form;
    if (evt.target) {
      evt.preventDefault();
      form = evt.target.form;
    } else form = evt;
    const arrElForm = Array.from(form);
    if (arrElForm[0].value.length === 0) {
      showMessageMovies(TEXT_ERROR_EMPTY_REQUEST);
      setNewListMovies([]);
      return;
    };
    if (testTextFormat(arrElForm[0].value)) {
      showMessageMovies(TEXT_ERROR_TEST_REQUEST);
      setNewListMovies([]);
      return;
    };
    const newConfigMovies = createdObjConfig(arrElForm);
    setConfigMovies(newConfigMovies);
    localStorage.setItem('configMovies', JSON.stringify(newConfigMovies));
    if (!isOneDownload) {
      setIsDownload(true);
      moviesApi
        .download()
        .then((movies) => {
          setIsOneDownload(true);
          setListMovies(movies);
          const filterListMovies = filterMovies(newConfigMovies, movies);
          if (filterListMovies.length === 0) {
            showMessageMovies(TEXT_ERROR_NO_MOVIES);
            return;
          }
          localStorage.setItem('lastMovies', JSON.stringify(filterListMovies));
          setNewListMovies(filterListMovies);
        })
        .catch((err) => {
          showMessageMovies(TEXT_ERROR_API_REQUEST);
          err.then(({ message }) => {
            if (message === 'Not Found')
              return console.error(TEXT_ERROR_NOT_FOUND);
            console.error(message);
          });
        })
        .finally(() => setIsDownload(false));
    } else {
      const filterListMovies = filterMovies(newConfigMovies, listMovies);
      if (filterListMovies.length === 0) {
        showMessageMovies(TEXT_ERROR_NO_MOVIES);
      };
      localStorage.setItem('lastMovies', JSON.stringify(filterListMovies));
      setNewListMovies(filterListMovies);
    }
  };

  const handleSubmitFormMoviesSaved = (evt) => {
    let form;
    if (evt.target) {
      evt.preventDefault();
      form = evt.target.form;
    } else form = evt;
    const arrElForm = Array.from(form);
    const newConfigMovies = createdObjConfig(arrElForm);
    const filterListMovies = filterMovies(newConfigMovies, listMoviesSaved);
    if (filterListMovies.length === 0) {
      showMessageMoviesSaved(TEXT_ERROR_NO_MOVIES);
    };
    setNewListMoviesSaved(filterListMovies);
  }


  return {
    isEN,
    isDownload,
    messageMovies,
    messageMoviesList,
    messageMoviesSaved,
    handleClickLikes,
    handleSubmitFormMoviesSaved,
    handleSubmitFormMovies,
    configMovies,
    newListMoviesSaved,
    newListMovies
  };
};

export default useMovies;