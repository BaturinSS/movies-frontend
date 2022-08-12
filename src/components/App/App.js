import React from "react";
import { useHistory } from 'react-router-dom';
import { Route, Switch } from "react-router-dom";
import { TranslationContext } from '../../contexts/CurrentUserContext';
import AboutProjectPage from "../../pages/AboutProject/AboutProjectPage";
import RegistrationPage from "../../pages/Registration/RegistrationPage";
import AuthorizationPage from "../../pages/Authorization/AuthorizationPage";
import NotFoundPage from "../../pages/NotFound/NotFoundPage";
import ProtectedPages from "../../pages/Protected/ProtectedPages";
import MainApi from "../../components/utils/api/MainApi";
import { NODE_ENV } from "../../components/utils/constants";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const api = new MainApi({ NODE_ENV: NODE_ENV });
  const history = useHistory();

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
          history.push('/movies');
        })
        .catch((err) => {
          err.then(({ message }) => {
            console.error(message);
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
              setCurrentUser={setCurrentUser}
              setIsLoggedIn={setIsLoggedIn}
            />
          </Route>
          <Route path="/sign-in" exact>
            <AuthorizationPage
              setCurrentUser={setCurrentUser}
              setIsLoggedIn={setIsLoggedIn}
            />
          </Route>
          <ProtectedPages
            isLoggedIn={isLoggedIn}
          />
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </TranslationContext.Provider>
    </>
  );
}

export default App;
