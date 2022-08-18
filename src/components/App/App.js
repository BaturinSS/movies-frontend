import React from "react";
import { Route, Switch } from "react-router-dom";
import { TranslationContext } from '../../contexts/TranslationContext';
import AboutProjectPage from "../../pages/AboutProject/AboutProjectPage";
import RegistrationPage from "../../pages/Registration/RegistrationPage";
import AuthorizationPage from "../../pages/Authorization/AuthorizationPage";
import NotFoundPage from "../../pages/NotFound/NotFoundPage";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import ProfilePage from "../../pages/Protected/Profile/ProfilePage";
import MoviesPage from "../../pages/Protected/Movies/MoviesPage";
import MoviesSavedPage from "../../pages/Protected/MoviesSaved/MoviesSavedPage";
import MainApi from "../../utils/api/MainApi";
import { NODE_ENV } from "../../utils/constants";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isDownload, setIsDownload] = React.useState(true);
  const [listMovies, setListMovies] = React.useState(JSON.parse(localStorage.getItem('lastMovies')) || []);
  const [listMoviesSaved, setListMoviesSaved] = React.useState([]);
  const [configMovies, setConfigMovies] = React.useState(JSON.parse(localStorage.getItem('configMovies')) || {})
  const [errorApi, setErrorApi] = React.useState('');

  const mainApi = new MainApi({ NODE_ENV: NODE_ENV });

  React.useEffect(() => {
    if (!isDownload) setIsDownload(true);
    if (isLoggedIn) return;

    if (NODE_ENV !== 'production') {
      const token = localStorage.getItem('jwt');
      if (!token) return setIsDownload(false);
    };

    mainApi
      .checkToken()
      .then(({ user, message }) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        setListMovies([]);
        setListMoviesSaved([]);
        err.then(({ message }) => {
          console.error(message);
        });
      })
      .finally(() => setIsDownload(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <TranslationContext.Provider value={{ currentUser }}>
        <Switch>
          <Route path="/" exact>
            <AboutProjectPage
              isDownload={isDownload}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route path="/sign-up" exact>
            <ProtectedRoute
              exact
              path="/sign-up"
              redirect={'/'}
              component={RegistrationPage}
              isLoggedIn={!isLoggedIn}
              setCurrentUser={setCurrentUser}
              setIsLoggedIn={setIsLoggedIn}
              isDownload={isDownload}
              setIsDownload={setIsDownload}
              errorApi={errorApi}
              setErrorApi={setErrorApi}
            />
          </Route>
          <Route path="/sign-in" exact>
            <ProtectedRoute
              exact
              path="/sign-in"
              redirect={'/'}
              component={AuthorizationPage}
              isLoggedIn={!isLoggedIn}
              setCurrentUser={setCurrentUser}
              setIsLoggedIn={setIsLoggedIn}
              isDownload={isDownload}
              setIsDownload={setIsDownload}
              errorApi={errorApi}
              setErrorApi={setErrorApi}
            />
          </Route>
          <Route path="/profile" exact>
            <ProtectedRoute
              exact
              path="/profile"
              redirect={'/sign-in'}
              component={ProfilePage}
              setCurrentUser={setCurrentUser}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              isDownload={isDownload}
              setConfigMovies={setConfigMovies}
              setListMovies={setListMovies}
              setListMoviesSaved={setListMoviesSaved}
            />
          </Route>
          <Route path="/movies" exact>
            <ProtectedRoute
              exact
              path="/movies"
              redirect={'/sign-in'}
              component={MoviesPage}
              isLoggedIn={isLoggedIn}
              isDownload={isDownload}
              listMovies={listMovies}
              setListMovies={setListMovies}
              listMoviesSaved={listMoviesSaved}
              setListMoviesSaved={setListMoviesSaved}
              configMovies={configMovies}
              setConfigMovies={setConfigMovies}
            />
          </Route>
          <Route path="/saved-movies" exact>
            <ProtectedRoute
              exact
              path="/saved-movies"
              redirect={'/sign-in'}
              component={MoviesSavedPage}
              isLoggedIn={isLoggedIn}
              isDownload={isDownload}
              listMovies={listMovies}
              setListMovies={setListMovies}
              listMoviesSaved={listMoviesSaved}
              setListMoviesSaved={setListMoviesSaved}
            />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </TranslationContext.Provider>
    </>
  );
}

export default App;
