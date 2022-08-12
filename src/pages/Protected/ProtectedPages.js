import React from "react";

import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";

import ProfilePage from "./Profile/ProfilePage";
import MoviesPage from "./Movies/MoviesPage";
import SavedMoviesPage from "./SavedMovies/SavedMoviesPage";

function ProtectedPages({ isLoggedIn }) {
  return (
    <>
      <ProtectedRoute
        exact
        path="/profile"
        component={ProfilePage}
        isLoggedIn={isLoggedIn}
      />
      <ProtectedRoute
        exact
        path="/movies"
        component={MoviesPage}
        isLoggedIn={isLoggedIn}
      />
      <ProtectedRoute
        exact
        path="/saved-movies"
        component={SavedMoviesPage}
        isLoggedIn={isLoggedIn}
      />
    </>
  )
}

export default ProtectedPages;
