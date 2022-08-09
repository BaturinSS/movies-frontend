import './MoviesAddButton.css';

import React from "react";


function MoviesAddButton({
  addMovies,
}) {
  return (
    <>
      <button className="movies-list__button-add"
        type="button"
        onClick={addMovies}>
        {`Ещё`}
      </button>
    </>
  )
}

export default MoviesAddButton;