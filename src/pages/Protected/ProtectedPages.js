import React from "react";

import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

import ProfilePage from "./Profile/ProfilePage";
import MoviesPage from "./Movies/MoviesPage";
import SavedMoviesPage from "./SavedMovies/SavedMoviesPage";

function ProtectedPages() {
  return (
    <>
      <ProtectedRoute
        exact
        path="/profile"
        component={ProfilePage}
      />
      <ProtectedRoute
        exact
        path="/movies"
        component={MoviesPage}
      />
      <ProtectedRoute
        exact
        path="/saved-movies"
        component={SavedMoviesPage}
      />
    </>
  )
}

export default ProtectedPages;
