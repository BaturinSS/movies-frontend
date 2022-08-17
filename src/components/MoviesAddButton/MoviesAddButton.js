import './MoviesAddButton.css';
import React from "react";

function MoviesAddButton({ handleClickAddMovies }) {
  return (
    <>
      <button className="movies-list__button-add"
        type="button"
        onClick={handleClickAddMovies}>{`Ещё`}
      </button>
    </>
  )
}

export default MoviesAddButton;
