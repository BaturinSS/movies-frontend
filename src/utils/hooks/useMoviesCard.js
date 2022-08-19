import React from "react";
import validator from "validator";
import MainApi from "../api/MainApi";
import {
  BASE_URL_IMAGE, URL_IMAGE_NO_IMAGE, TEXT_MOVIE_NO_NAME,
  URL_YOUTUBE, TEXT_ERROR, NODE_ENV,
} from "../constants";

const useMoviesCard = (
  showMessageMoviesList,
  listMoviesSaved, setListMoviesSaved,
  newListMoviesSaved, setNewListMoviesSaved
) => {
  const api = new MainApi({ NODE_ENV: NODE_ENV });

  const [
    listSearchMovies,
  ] = React.useState(JSON.parse(localStorage.getItem('lastMovies')))

  const validUrl = (url) => {
    if (validator.isURL(url.trim())) {
      return url;
    } else { return null }
  }

  const likeMovies = (film) => {
    listSearchMovies.forEach((movies) => {
      if (movies.id === film.movieId) {
        movies.like = true;
      }
    })
    localStorage.setItem('lastMovies', JSON.stringify(listSearchMovies));
  }

  const dislikeMovies = (film) => {
    listSearchMovies.forEach((movies) => {
      if (movies.id === film.movieId) {
        movies.like = false;
      }
    })
    localStorage.setItem('lastMovies', JSON.stringify(listSearchMovies));
  }

  const changeFavoriteMovies = (film) => {
    if (film.deletedFilm) {
      setListMoviesSaved(listMoviesSaved.filter((el) => {
        return el._id !== film.deletedFilm._id;
      }))
      setNewListMoviesSaved(newListMoviesSaved.filter((el) => {
        return el._id !== film.deletedFilm._id;
      }))
    } else {
      setListMoviesSaved([film.newFilm, ...listMoviesSaved]);
    }
  };

  const reformatCardMovies = (film) => {
    const checkedUrlImage = (object) => {
      const objectFormatsImage = film.image.formats;

      const backupUrlImage = film.image
        ? validUrl(BASE_URL_IMAGE + film.image.url)
        : URL_IMAGE_NO_IMAGE;

      if (objectFormatsImage.object) {
        return validUrl(`${BASE_URL_IMAGE + objectFormatsImage.object.url}`.trim()) ||
          backupUrlImage || URL_IMAGE_NO_IMAGE
      } else { return backupUrlImage || URL_IMAGE_NO_IMAGE };
    };

    const checkedTextName = (textOne, textTwo) => {
      return textOne
        ? String(textOne).trim()
        : String(textTwo).trim() || TEXT_MOVIE_NO_NAME
    };

    const checkedUrlVideo = (link) => {
      return link
        ? validUrl(link) || URL_YOUTUBE
        : URL_YOUTUBE
    };

    const newFilm = {
      movieId: Number(film.id),
      country: String(film.country).trim(),
      director: String(film.director).trim(),
      duration: Number(film.duration),
      year: String(film.year).trim(),
      description: String(film.description).trim(),
      nameRU: checkedTextName(film.nameRU, film.nameEN),
      nameEN: checkedTextName(film.nameEN, film.nameRU),
      imageThumbnail: checkedUrlImage('thumbnail'),
      imageSmall: checkedUrlImage('small'),
      trailerLink: checkedUrlVideo(film.trailerLink),
    }
    return newFilm;
  }

  const addFavorite = (film) => {
    const newFilm = reformatCardMovies(film);
    api
      .addMovies(newFilm)
      .then(({ message, newFilm }) => {
        film.like = true;
        if (film.id) likeMovies(newFilm);
        showMessageMoviesList(message, '')
        changeFavoriteMovies({ newFilm: newFilm });
      })
      .catch((err) => {
        showMessageMoviesList(TEXT_ERROR, '')
        if (err.name === 'TypeError') {
          return console.error(err.message);
        }
        err.then(({ message }) => {
          console.error('error:', message)
        });
      })
  }

  const deleteFavorite = (film) => {
    api
      .deleteMovies(film.id || film.movieId)
      .then(({ message, deletedFilm }) => {
        film.like = false;
        if (film.id) dislikeMovies(deletedFilm);
        showMessageMoviesList(message, '')
        changeFavoriteMovies({ deletedFilm: deletedFilm });
      })
      .catch((err) => {
        showMessageMoviesList(TEXT_ERROR, '')
        if (err.name === 'TypeError') {
          return console.error(err.message);
        }
        err.then(({ message }) => {
          console.error('error', message)
        });
      })
  }

  const handleClickLikes = (film) => {
    film.like || film._id
      ? deleteFavorite(film)
      : addFavorite(film);
  }

  return { handleClickLikes }
}

export default useMoviesCard;