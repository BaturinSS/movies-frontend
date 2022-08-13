import { useState } from "react";

const useMoviesCard = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const time = (timeFull) => {
    const minutes = timeFull % 60;
    const hours = Math.trunc(timeFull / 60);

    const timeHours = () => {
      if (hours === 1 && minutes === 0) return '60м'
      return hours !== 0
        ? `${hours}ч`
        : ''
    }

    const timeMinutes = () => {
      if (String(minutes).length === 1 && minutes !== 0) return `0${minutes}м`
      return minutes !== 0
        ? `${minutes}м`
        : ''
    }

    return `${timeHours()} ${timeMinutes()}`
  }

  const addFavorite = () => {
    setIsFavorite(true);
    console.log('add')
  }

  const deleteFavorite = () => {
    setIsFavorite(false);
    console.log('del')
  }

  const handleClickFavorite = () => {
    console.log(isFavorite)
    isFavorite
      ? deleteFavorite()
      : addFavorite();
  }

  return { isFavorite, handleClickFavorite, time }
}

export default useMoviesCard;