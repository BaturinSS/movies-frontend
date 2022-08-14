import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { TranslationContext } from '../../contexts/TranslationContext';
import AboutProjectPage from "../../pages/AboutProject/AboutProjectPage";
import RegistrationPage from "../../pages/Registration/RegistrationPage";
import AuthorizationPage from "../../pages/Authorization/AuthorizationPage";
import NotFoundPage from "../../pages/NotFound/NotFoundPage";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import ProfilePage from "../../pages/Protected/Profile/ProfilePage";
import MoviesPage from "../../pages/Protected/Movies/MoviesPage";
import SavedMoviesPage from "../../pages/Protected/SavedMovies/SavedMoviesPage";
import MainApi from "../../components/utils/api/MainApi";
import { NODE_ENV } from "../../components/utils/constants";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isDownload, setIsDownload] = React.useState(true);
  const api = new MainApi({ NODE_ENV: NODE_ENV });
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    if (isLoggedIn) return;
    const token = localStorage.getItem('jwt');
    if (token || NODE_ENV === 'production') {
      api
        .checkToken()
        .then(({ user, message }) => {
          console.log(message);
          setCurrentUser(user);
          setIsLoggedIn(true);
          // history.push(location.pathname);
          setIsDownload(false);
        })
        .catch((err) => {
          err.then(({ message }) => {
            console.error(message);
            setIsDownload(false);
          });
        });
    };
  }, [])

  return (
    <>
      <TranslationContext.Provider value={{ currentUser }}>
        <Switch>
          <Route path="/" exact>
            <AboutProjectPage
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route path="/sign-up" exact>
            <RegistrationPage
              isLoggedIn={isLoggedIn}
              setCurrentUser={setCurrentUser}
              setIsLoggedIn={setIsLoggedIn}
            />
          </Route>
          <Route path="/sign-in" exact>
            <AuthorizationPage
              isLoggedIn={isLoggedIn}
              setCurrentUser={setCurrentUser}
              setIsLoggedIn={setIsLoggedIn}
            />
          </Route>
          <Route path="/profile" exact>
            <ProtectedRoute
              exact
              path="/profile"
              component={ProfilePage}
              setCurrentUser={setCurrentUser}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              isDownload={isDownload}
            />
          </Route>
          <Route path="/movies" exact>
            <ProtectedRoute
              exact
              path="/movies"
              component={MoviesPage}
              isLoggedIn={isLoggedIn}
              isDownload={isDownload}
            />
          </Route>
          <Route path="/saved-movies" exact>
            <ProtectedRoute
              exact
              path="/saved-movies"
              component={SavedMoviesPage}
              isLoggedIn={isLoggedIn}
              isDownload={isDownload}
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
