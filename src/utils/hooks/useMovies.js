import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import moviesApi from "../api/MoviesApi";
import MainApi from "../api/MainApi";
import useMoviesCard from "./useMoviesCard";
import {
  TEXT_MESSAGE_NO_SEARCH, NODE_ENV, TEXT_ERROR_NOT_FOUND,
  TEXT_MESSAGE_NO_FAVORITE, TEXT_ERROR,
  TEXT_ERROR_EMPTY_REQUEST, TEXT_ERROR_API_REQUEST,
} from "../constants";
import { checkedLengthArray } from "../utils";

const useMovies = (
  listMovies, setListMovies,
  listMoviesSaved, setListMoviesSaved,
  configMovies, setConfigMovies,
) => {
  const [isDownload, setIsDownload] = React.useState(false);
  const [messageMovies, setMessageMovies] = React.useState(TEXT_MESSAGE_NO_SEARCH);
  const [messageMoviesSave, setMessageMoviesSave] = React.useState(TEXT_MESSAGE_NO_FAVORITE);
  const [newListMoviesSaved, setNewListMoviesSaved] = React.useState([]);
  const [newListMovies, setNewListMovies] = React.useState([]);
  const [isEN, setIsEN] = useState(false)
  const [isOneDownload, setIsOneDownload] = React.useState(false);
  const mainApi = new MainApi({ NODE_ENV: NODE_ENV });

  const { } = useMoviesCard();

  const location = useLocation();

  React.useEffect(() => {
    if (checkedLengthArray(listMoviesSaved)) {
      mainApi
        .getMovies()
        .then(({ films }) => {
          setListMoviesSaved(films);
          setNewListMoviesSaved(films);
        })
        .catch((err) => {
          setMessageMoviesSave(TEXT_ERROR);
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

  const checkedValueSearch = (el) => {
    if (el.value.length === 0) return true;
    return false;
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
    if (location.pathname === '/movies')
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
      setMessageMovies(TEXT_ERROR_EMPTY_REQUEST);
      setTimeout(() => setMessageMovies(TEXT_MESSAGE_NO_SEARCH), 5000);
      return;
    } else {
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
            localStorage.setItem('lastMovies', JSON.stringify(filterListMovies));
            setNewListMovies(filterListMovies);
          })
          .catch((err) => {
            setMessageMovies(TEXT_ERROR_API_REQUEST);
            err.then(({ message }) => {
              if (message === 'Not Found')
                return console.error(TEXT_ERROR_NOT_FOUND);
              console.error(message);
            });
          })
          .finally(() => {
            setIsDownload(false);
            setTimeout(() => setMessageMovies(TEXT_MESSAGE_NO_SEARCH), 5000);
          });
      } else {
        const filterListMovies = filterMovies(newConfigMovies, listMovies);
        localStorage.setItem('lastMovies', JSON.stringify(filterListMovies));
        setNewListMovies(filterListMovies);
      }
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
    const newList = filterMovies(newConfigMovies, listMoviesSaved);
    setNewListMoviesSaved(newList);
  }


  return {
    isEN,
    isDownload,
    newListMoviesSaved,
    newListMovies,
    messageMovies,
    messageMoviesSave,
    handleSubmitFormMoviesSaved,
    handleSubmitFormMovies,
    configMovies,
  };
};

export default useMovies;