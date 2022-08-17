import { useState } from "react";
import validator from "validator";
import MainApi from "../api/MainApi";
import {
  BASE_URL_IMAGE, URL_IMAGE_NO_IMAGE, TEXT_MOVIE_NO_NAME,
  URL_YOUTUBE, TEXT_ERROR_FAVORITE, NODE_ENV,
} from "../constants";

const useMoviesCard = (
  isFavoriteMovies, setIsFavoriteMovies,
  setIsMessage,
) => {

  const [isFavorite, setIsFavorite] = useState(false);

  const api = new MainApi({ NODE_ENV: NODE_ENV });

  const validUrl = (url) => {
    if (validator.isURL(url.trim())) {
      return url;
    } else { return null }
  }

  const changeFavoriteMovies = (film) => {
    if (film.deletedFilm) {
      setIsFavoriteMovies(isFavoriteMovies.filter((el) => {
        return el._id !== film.deletedFilm._id;
      }))
    } else {
      setIsFavoriteMovies(...isFavoriteMovies, film.newFilm)
    }
  };

  const addFavorite = (film) => {

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

    api
      .addMovies(newFilm)
      .then(({ message, newFilm }) => {
        setIsMessage(message);
        setIsFavorite(true);
        changeFavoriteMovies({ newFilm: newFilm });
      })
      .catch((err) => {
        setIsMessage(TEXT_ERROR_FAVORITE);
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
        setIsMessage(message);
        setIsFavorite(false);
        changeFavoriteMovies({ deletedFilm: deletedFilm });
      })
      .catch((err) => {
        setIsMessage(TEXT_ERROR_FAVORITE);
        if (err.name === 'TypeError') {
          return console.error(err.message);
        }
        err.then(({ message }) => {
          console.error('error', message)
        });
      })
  }

  const handleClickFavorite = (film, _id) => {
    isFavorite || _id
      ? deleteFavorite(film)
      : addFavorite(film);
  }

  return { isFavorite, handleClickFavorite }
}

export default useMoviesCard;