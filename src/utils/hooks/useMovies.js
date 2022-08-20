import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import moviesApi from "../api/MoviesApi";
import MainApi from "../api/MainApi";
import useMoviesCard from '../../utils/hooks/useMoviesCard';
import { checkedLengthArray, sortAlphabetList } from "../utils";

import {
  TEXT_MESSAGE_NO_SEARCH, NODE_ENV, TEXT_ERROR_NOT_FOUND,
  TEXT_MESSAGE_NO_FAVORITE, TEXT_ERROR,
  TEXT_ERROR_EMPTY_REQUEST, TEXT_ERROR_API_REQUEST,
  TEXT_ERROR_NO_MOVIES, REGEX_TEXT_SEARCH,
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
  const [limitedCounter, setLimitedCounter] = React.useState(0);
  const [widthScreen, setWidthScreen] = React.useState(document.documentElement.clientWidth);
  const [finalityListMovies, setFinalityListMovies] = React.useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  const [
    listSearchMovies, setListSearchMovies
  ] = React.useState(JSON.parse(localStorage.getItem('lastMovies')))

  const likeMovies = (film) => {
    listSearchMovies.forEach((movies) => {
      if (movies.id === film.movieId) {
        movies.like = true;
      }
    })
    localStorage.setItem('lastMovies', JSON.stringify(listSearchMovies));
  }

  const dislikeMovies = (deletedFilm, film) => {
    if (!listSearchMovies) return;
    film.like = false;
    listSearchMovies.forEach((movies) => {
      if (movies.id === deletedFilm.movieId) {
        movies.like = false;
      }
    })
    localStorage.setItem('lastMovies', JSON.stringify(listSearchMovies));
  }

  const { handleClickLikes } = useMoviesCard(
    showMessageMoviesList,
    listMoviesSaved, setListMoviesSaved,
    newListMoviesSaved, setNewListMoviesSaved,
    likeMovies, dislikeMovies,
  );

  const eventChangeScreenWidth = React.useCallback(() => {
    setTimeout(() => {
      const windowInnerWidth = document.documentElement.clientWidth;
      setWidthScreen(windowInnerWidth);
    }, 10000);
  }, [])

  const mainApi = new MainApi({ NODE_ENV: NODE_ENV });

  const location = useLocation();

  const testTextFormat = (text) => {
    return !(REGEX_TEXT_SEARCH.test(`${text}`));
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
          setListMoviesSaved(sortAlphabetList(films, isEN));
          setNewListMoviesSaved(sortAlphabetList(films, isEN));
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
    window.addEventListener("resize", eventChangeScreenWidth);
    return () => {
      window.removeEventListener("resize", eventChangeScreenWidth);
    };
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

  const filterMovies = ({ filter, searchQuery }, list) => {
    if (searchQuery === undefined || searchQuery === null) return;
    const regex = new RegExp(`${searchQuery.replace(/[^A-Za-zА-Яа-яЁё0-9']+/g, '')}`, "i")
    const isEN = /[A-Za-z]/i.test(searchQuery);
    setIsEN(isEN);

    const formString = (movies) => {
      return isEN
        ? (movies.nameEN && movies.nameEN !== '')
          ? movies.nameEN.replace(/[^A-Za-zА-Яа-яЁё0-9']+/g, '')
          : movies.nameRU.replace(/[^A-Za-zА-Яа-яЁё0-9']+/g, '')
        : (movies.nameRU && movies.nameRU !== '')
          ? movies.nameRU.replace(/[^A-Za-zА-Яа-яЁё0-9']+/g, '')
          : movies.nameEN.replace(/[^A-Za-zА-Яа-яЁё0-9']+/g, '')
    };

    const filterExpression = (str, movies) => {
      return filter
        ? movies.duration <= 40 && regex.test(str)
        : regex.test(str)
    };

    const newListMovies = [];

    for (let i = 0; i < list.length; i++) {
      const movies = list[i];
      const str = formString(movies);
      if (filterExpression(str, movies)) {
        newListMovies.push(movies);
      };
    };

    return newListMovies.map((movie) => {
      const id = movie.id || movie.movieId;
      const isLike = () => {
        for (let i = 0; i < listMoviesSaved.length; i++) {
          if (listMoviesSaved[i].movieId === id) return true;
        }
        return false;
      }
      movie.like = isLike();
      return movie;
    })
  }

  React.useEffect(() => {
    if (location.pathname === '/movies' && Object.keys(configMovies).length !== 0)
      setNewListMovies(JSON.parse(localStorage.getItem('lastMovies')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmitFormMovies = (evt) => {
    setLimitedCounter(0);
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
          const sortMovies = sortAlphabetList(movies, isEN)
          setListMovies(sortMovies);
          const filterListMovies =
            filterMovies(newConfigMovies, sortMovies);
          if (filterListMovies.length === 0) {
            showMessageMovies(TEXT_ERROR_NO_MOVIES);
          }
          localStorage.setItem('lastMovies', JSON.stringify(filterListMovies));
          setListSearchMovies(JSON.parse(localStorage.getItem('lastMovies')))
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
  }

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

  React.useEffect(() => {
    if (!isOneDownload) return;
    const filterListMovies = filterMovies(configMovies, listMovies);
    if (filterListMovies.length === 0) {
      showMessageMovies(TEXT_ERROR_NO_MOVIES);
    };
    localStorage.setItem('lastMovies', JSON.stringify(filterListMovies));
    setListSearchMovies(JSON.parse(localStorage.getItem('lastMovies')))
    setNewListMovies(filterListMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configMovies, widthScreen, limitedCounter])

  React.useEffect(() => {
    let count = 12;
    if (widthScreen >= 1028) {
      count = 12;
    } else if (widthScreen >= 747) {
      count = 8;
    } else {
      count = 5;
    }

    const arr = isOneDownload
      ? newListMovies
      : listSearchMovies
        ? listSearchMovies
        : newListMovies

    if (arr.length === 0) {
      setFinalityListMovies(arr);
      return;
    };

    if (arr.length >= count + limitedCounter) setIsButtonDisabled(true);

    const newArr = [];
    for (let i = 0; i < (count + limitedCounter); i++) {
      newArr.push(arr[i]);
      if (arr.length - 1 === i) break;
    }

    if (arr.length === newArr.length) setIsButtonDisabled(false);

    setFinalityListMovies(newArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listSearchMovies, widthScreen, newListMovies, limitedCounter])

  const numberAddCard = () => {
    return widthScreen >= 1028
      ? 3
      : 2
  }

  const handleClickAddMovies = () => {
    setLimitedCounter(limitedCounter + numberAddCard())
  }

  return {
    isEN,
    isDownload,
    messageMovies,
    messageMoviesList,
    messageMoviesSaved,
    handleClickLikes,
    handleClickAddMovies,
    handleSubmitFormMoviesSaved,
    handleSubmitFormMovies,
    configMovies,
    newListMoviesSaved,
    finalityListMovies,
    isButtonDisabled,
  };
};

export default useMovies;