import React from "react";
import moviesApi from "../api/MoviesApi";
import MainApi from "../api/MainApi";

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
  const [isShow, setIsShow] = React.useState(false);
  const [newListMovies, setNewListMovies] = React.useState([]);


  const mainApi = new MainApi({ NODE_ENV: NODE_ENV });

  React.useEffect(() => {
    if (checkedLengthArray(listMoviesSaved)) {
      mainApi
        .getMovies()
        .then(({ films }) => {
          setListMoviesSaved(films);
          setNewListMovies(films)
        })
        .catch((err) => {
          setMessageMoviesSave(TEXT_ERROR);
          err.then(({ message }) => {
            console.error(message);
          });
        });
    } else setNewListMovies(listMoviesSaved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadMoviesApi = () => {
    setIsDownload(true);
    moviesApi
      .download()
      .then((moviesList) => {
        setListMovies(moviesList);
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
  };

  const createdObjConfig = (form) => {
    let obj = {};
    form.forEach((el) => {
      if (el.name === 'searchQuery') obj = { ...obj, [el.name]: el.value };
      if (el.name === 'filter') obj = { ...obj, [el.name]: el.checked };
    })
    return obj;
  };

  const checkedValueSearch = (el) => {
    if (el.value.length === 0) return false;
    return true;
  };

  const filterMovies = ({ filter, searchQuery }, listMovies) => {
    const regex = new RegExp(`${searchQuery.replace(/[^A-Za-zА-Яа-яЁё0-9]+/g, '')}`, "i")
    const isEN = /[A-Za-z]/i.test(searchQuery);
    let str = '';
    return listMovies.filter((movies) => {
      isEN
        ? str = movies.nameEN.replace(/[^A-Za-z][0-9]\?/g, '')
        : str = movies.nameRU.replace(/[^А-Яа-яЁё][0-9]\?/g, '')

      return filter
        ? movies.duration <= 40 && regex.test(str)
        : regex.test(str)
    }
    )
  }

  const handleSubmitForm = (evt) => {
    let form;
    if (evt.target) {
      evt.preventDefault();
      form = evt.target.form;
    } else form = evt;

    const arrElForm = Array.from(form);
    const searchString = arrElForm[0];

    if (form.name === 'FormSearchMovies') {
      if (checkedValueSearch(searchString)) {
        setMessageMovies(TEXT_ERROR_EMPTY_REQUEST);
        setTimeout(() => setMessageMovies(TEXT_MESSAGE_NO_SEARCH), 5000);
        return;
      } else {
        const newConfigMovies = createdObjConfig(arrElForm);
        setConfigMovies(newConfigMovies);
        localStorage.setItem('configMovies', JSON.stringify(newConfigMovies));
        setIsShow(!isShow);
        // if (checkedLengthArray(isMoviesListApi)) downloadMoviesApi();
      }
    } else {
      const newConfigMovies = createdObjConfig(arrElForm);
      const newList = filterMovies(newConfigMovies, listMoviesSaved);
      setNewListMovies(newList);
      console.log(newList)
    };

    if (checkedValueSearch(searchString)) {
      if (form.name === 'FormSearchMovies') {
        const newConfigMovies = createdObjConfig(arrElForm);
        setConfigMovies(newConfigMovies);
        localStorage.setItem('configMovies', JSON.stringify(newConfigMovies));
        setIsShow(!isShow);
        // if (checkedLengthArray(isMoviesListApi)) downloadMoviesApi();
      } else {

      };
    } else if (form.name === 'FormSearchMovies') {
      setMessageMovies(TEXT_ERROR_EMPTY_REQUEST);
      setTimeout(() => setMessageMovies(TEXT_MESSAGE_NO_SEARCH), 5000);
      return;
    } else return;
  }


  return {
    isDownload,
    newListMovies,
    messageMovies,
    messageMoviesSave,
    handleSubmitForm,
  };
};

export default useMovies;