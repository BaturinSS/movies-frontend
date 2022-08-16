import { useState } from "react";
import validator from "validator";
import MainApi from "../api/MainApi";
import { NODE_ENV } from "../constants";
import {
  BASE_URL_IMAGE, URL_IMAGE_NO_IMAGE, TEXT_MOVIE_NO_NAME,
  URL_YOUTUBE, TEXT_ERROR_NO_CONNECTION,
} from "../constants";

const useMoviesCard = (isFavoriteMovies, setIsFavoriteMovies,) => {

  const [isFavorite, setIsFavorite] = useState(false);

  const api = new MainApi({ NODE_ENV: NODE_ENV });

  const validUrl = (url) => {
    if (validator.isURL(url.trim())) {
      return url;
    } else { return null }
  }

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
        setIsFavorite(true);
        console.log(message);
        // console.log(isFavoriteMovies)
        // setIsFavoriteMovies(...isFavoriteMovies, newFilm)
      })
      .catch((err) => {
        if (err.name === 'TypeError') {
          return console.error(`${TEXT_ERROR_NO_CONNECTION}: "${err.message}"`);
        }
        err.then(({ message }) => {
          console.log('error', message)
        });
      })
      .finally(() => {
        console.log('final')
      })
  }

  // const objMovies = (film, newFilm) => {
  //   const copyIsMoviesListApi = isMoviesListApi;
  //   return copyIsMoviesListApi.map((el, i) => {
  //     if (el.id === film.id) {
  //       const newEl = { ...el, _id: newFilm._id }
  //       copyIsMoviesListApi.splice(i, 1, newEl)
  //       setIsMoviesListApi(copyIsMoviesListApi);
  //     };
  //   });
  // };


  const deleteFavorite = (film) => {
    console.log('new', isFavoriteMovies)
    api
      .deleteMovies(film.id)
      .then(({ message, newFilm }) => {
        setIsFavorite(false);
        // objMovies(film, newFilm);
        console.log(message)
        // setIsFavoriteMovies([newFilm, ...isFavoriteMovies])
        // console.log('delete', isFavoriteMovies)
      })
      .catch((err) => {
        if (err.name === 'TypeError') {
          return console.error(`${TEXT_ERROR_NO_CONNECTION}: "${err.message}"`);
        }
        err.then(({ message }) => {
          console.log('error', message)
        });
      })
      .finally(() => {
        console.log('final')
      })
  }

  const handleClickFavorite = (film) => {
    isFavorite
      ? deleteFavorite(film)
      : addFavorite(film);
  }

  return { isFavorite, handleClickFavorite }
}

export default useMoviesCard;