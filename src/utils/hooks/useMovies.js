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
  TEXT_ERROR_NO_MOVIES,
} from "../constants";

const useMovies = (
  listMovies, setListMovies,
  listMoviesSaved, setListMoviesSaved,
  configMovies, setConfigMovies,
) => {
  const { handleClickLikes } = useMoviesCard();

  const [isDownload, setIsDownload] = React.useState(false);
  const [messageMovies, setMessageMovies] = React.useState(TEXT_MESSAGE_NO_SEARCH);
  const [messageMoviesSaved, setMessageMoviesSaved] = React.useState(TEXT_MESSAGE_NO_FAVORITE);
  const [newListMoviesSaved, setNewListMoviesSaved] = React.useState([]);
  const [messageMoviesList, setMessageMoviesList] = React.useState('');
  const [messageMoviesSavedList, setMessageMoviesSavedList] = React.useState('');
  const [newListMovies, setNewListMovies] = React.useState([]);
  const [isEN, setIsEN] = useState(false)
  const [isOneDownload, setIsOneDownload] = React.useState(false);

  const mainApi = new MainApi({ NODE_ENV: NODE_ENV });

  const location = useLocation();

  function showMessageMovies(isList, message, resetMessageList) {
    let funcCallBack;
    if (isList) {
      setMessageMoviesList(message);
      funcCallBack = () => setMessageMoviesList(resetMessageList);
    } else {
      setMessageMovies(message);
      funcCallBack = () => setMessageMovies(TEXT_MESSAGE_NO_SEARCH);
    }
    setTimeout(funcCallBack, 5000);
  }

  function showMessageMoviesSaved(isList, message, resetMessageList) {
    let funcCallBack;
    if (isList) {
      setMessageMoviesSavedList(message);
      funcCallBack = () => setMessageMoviesSavedList(resetMessageList);
    } else {
      setMessageMoviesSaved(message);
      funcCallBack = () => setMessageMoviesSaved(TEXT_MESSAGE_NO_FAVORITE);
    }
    setTimeout(funcCallBack, 5000);
  }

  React.useEffect(() => {
    if (checkedLengthArray(listMoviesSaved)) {
      mainApi
        .getMovies()
        .then(({ films }) => {
          setListMoviesSaved(films);
          setNewListMoviesSaved(films);
        })
        .catch((err) => {
          showMessageMoviesSaved(false, TEXT_ERROR);
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
    return listMovies.filter((movies) => {
      isEN
        ? str = movies.nameEN
          ? movies.nameEN.replace(/[^A-Za-zА-Яа-яЁё0-9']+/g, '')
          : ''
        : str = movies.nameRU
          ? movies.nameRU.replace(/[^A-Za-zА-Яа-яЁё0-9']+/g, '')
          : ''
      return filter
        ? movies.duration <= 40 && regex.test(str)
        : regex.test(str)
    }
    )
  }

  React.useEffect(() => {
    if (location.pathname === '/movies' && Object.keys(configMovies).length !== 0)
      setNewListMovies(filterMovies(configMovies, listMovies));
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
      showMessageMovies(false, TEXT_ERROR_EMPTY_REQUEST);
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
            showMessageMovies(false, TEXT_ERROR_NO_MOVIES);
            return;
          }
          localStorage.setItem('lastMovies', JSON.stringify(filterListMovies));
          setNewListMovies(filterListMovies);
        })
        .catch((err) => {
          showMessageMovies(false, TEXT_ERROR_API_REQUEST);
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
        showMessageMovies(false, TEXT_ERROR_NO_MOVIES);
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
      showMessageMoviesSaved(false, TEXT_ERROR_NO_MOVIES);
    };
    setNewListMoviesSaved(filterListMovies);
  }


  return {
    isEN,
    isDownload,
    newListMoviesSaved,
    newListMovies,
    messageMovies,
    messageMoviesList,
    messageMoviesSaved,
    handleClickLikes,
    handleSubmitFormMoviesSaved,
    handleSubmitFormMovies,
    configMovies,
  };
};

export default useMovies;