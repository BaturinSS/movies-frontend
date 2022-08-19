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
  const [isOneDownload, setIsOneDownload] = React.useState(false);
  const [configMovies, setConfigMovies] = React.useState(JSON.parse(localStorage.getItem('configMovies')) || {})
  const [errorApi, setErrorApi] = React.useState('');

  const mainApi = new MainApi({ NODE_ENV: NODE_ENV });

  const clearingMemory = () => {
    localStorage.clear();
    setListMovies([]);
    setListMoviesSaved([]);
    setConfigMovies({});
    setIsOneDownload(false);
  }

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
        if (err.name === 'TypeError') {
          return console.error(err.message);
        };
        clearingMemory();
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
              clearingMemory={clearingMemory}
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
              isOneDownload={isOneDownload}
              setIsOneDownload={setIsOneDownload}
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
              isOneDownload={isOneDownload}
              setIsOneDownload={setIsOneDownload}
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
