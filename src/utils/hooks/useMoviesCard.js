import MainApi from "../api/MainApi";
import { validUrl } from "../utils";

import {
  BASE_URL_IMAGE, URL_IMAGE_NO_IMAGE, TEXT_MOVIE_NO_NAME,
  URL_YOUTUBE, TEXT_ERROR, NODE_ENV,
} from "../constants";

const useMoviesCard = (
  showMessageMoviesList,
  listMoviesSaved, setListMoviesSaved,
  newListMoviesSaved, setNewListMoviesSaved,
  likeMovies, dislikeMovies,
) => {
  const api = new MainApi({ NODE_ENV: NODE_ENV });

  function changeFavoriteMovies(film) {
    if (!film.deletedFilm) return setListMoviesSaved([film.newFilm, ...listMoviesSaved]);
    setListMoviesSaved(listMoviesSaved.filter((el) => (el._id !== film.deletedFilm._id)));
    setNewListMoviesSaved(newListMoviesSaved.filter((el) => (el._id !== film.deletedFilm._id)));
  };

  const reformatCardMovies = (film) => {
    const checkedUrlImage = (object) => {
      const objectFormatsImage = film.image.formats;

      const backupUrlImage = (film.image)
        ? validUrl(BASE_URL_IMAGE + film.image.url)
        : URL_IMAGE_NO_IMAGE;

      return (objectFormatsImage.object)

        ? (backupUrlImage) || (URL_IMAGE_NO_IMAGE) ||
        (validUrl(`${BASE_URL_IMAGE + objectFormatsImage.object.url}`.trim()))

        : (backupUrlImage) || (URL_IMAGE_NO_IMAGE);
    };


    const checkedTextName = (textOne, textTwo) => {
      return (textOne)
        ? String(textOne).trim()
        : (String(textTwo).trim()) || (TEXT_MOVIE_NO_NAME);
    };

    const checkedUrlVideo = (link) => {
      return (link)
        ? (validUrl(link)) || (URL_YOUTUBE)
        : URL_YOUTUBE;
    };

    return {
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
    };
  };

  function addFavorite(film) {
    const newFilm = reformatCardMovies(film);
    api
      .addMovies(newFilm)
      .then(({ message, newFilm }) => {
        film.like = true;
        likeMovies(newFilm);
        showMessageMoviesList(message, '');
        changeFavoriteMovies({ newFilm: newFilm });
      })
      .catch((err) => {
        showMessageMoviesList(TEXT_ERROR, '');
        if (err.name === 'TypeError') return console.error('ERROR:', err.message);
        err.then(({ message }) => console.error('error:', message));
      });
  };

  function deleteFavorite(film) {
    api
      .deleteMovies((film.id) || (film.movieId))
      .then(({ message, deletedFilm }) => {
        if (film.like) film.like = false;
        dislikeMovies(deletedFilm);
        showMessageMoviesList(message, '');
        changeFavoriteMovies({ deletedFilm: deletedFilm });
      })
      .catch((err) => {
        showMessageMoviesList(TEXT_ERROR, '');
        if (err.name === 'TypeError') return console.error('ERROR:', err.message);
        err.then(({ message }) => console.error('error', message));
      });
  };

  function handleClickLikes(film) {
    (film.like) || (film._id)
      ? deleteFavorite(film)
      : addFavorite(film);
  };

  return { handleClickLikes };
};

export default useMoviesCard;
