import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from 'react-router-dom';

import { disablePageScroll, enablePageScroll } from 'scroll-lock';

import AboutProjectPage from '../../pages/AboutProject/AboutProjectPage';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import AuthenticationPage from '../../pages/AuthenticationPage/AuthenticationPage';
import ProfilePage from '../../pages/Profile/ProfilePage';
import MoviesPage from '../../pages/Movies/MoviesPage';
import SavedMoviesPage from '../../pages/SavedMovies/SavedMoviesPage';
import NotFoundPage from '../../pages/NotFound/NotFoundPage';

import moviesList from '../../components/utils/moviesList.json';

import { textMessageError } from '../../components/utils/constants'

function App() {
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isCards, setIsCards] = useState(moviesList);

  const [
    isEmail,
    setIsEmail
  ] = useState(localStorage.getItem('login'));

  const [isName, setIsName] = useState('');

  const isOpen = isOpenMenu;

  const disableScroll = () => {
    disablePageScroll();
  };

  const enableScroll = () => {
    enablePageScroll();
  };

  const closeOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
    if (!isOpenMenu) {
      disableScroll();
    } else {
      enableScroll();
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    function handleOverlay(event) {
      if (event.target.classList.contains('open-popup')
        || event.target.classList.contains('close-popup')) {
        closeOpenMenu();
      }
    };
    document.addEventListener("mousedown", handleOverlay);
    return () => document.removeEventListener("mousedown", handleOverlay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onSubmitFormLogin = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
    localStorage.setItem("login", event.target[0].value);
    history.push('/');
  }

  const onSubmitFormAuth = (event) => {
    event.preventDefault();
    localStorage.setItem("login", event.target[1].value);
    history.push('/sign-in');
  }

  const outputProfile = () => {
    setIsLoggedIn(false);
    history.push('/');
    setIsName('');
  }

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <AboutProjectPage
            isLoggedIn={isLoggedIn}
            closeOpenMenu={closeOpenMenu}
            isOpenMenu={isOpenMenu}
          />
        </Route>
        <Route path="/sign-up" exact>
          <RegistrationPage
            textMessageError={textMessageError}
            isEmail={isEmail}
            setIsEmail={setIsEmail}
            isName={isName}
            setIsName={setIsName}
            isLoggedIn={isLoggedIn}
            closeOpenMenu={closeOpenMenu}
            isOpenMenu={isOpenMenu}
            onSubmitForm={onSubmitFormAuth}
          />
        </Route>
        <Route path="/sign-in" exact>
          <AuthenticationPage
            textMessageError={textMessageError}
            isEmail={isEmail}
            setIsEmail={setIsEmail}
            isLoggedIn={isLoggedIn}
            closeOpenMenu={closeOpenMenu}
            isOpenMenu={isOpenMenu}
            onSubmitForm={onSubmitFormLogin}
          />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage
            isLoggedIn={isLoggedIn}
            closeOpenMenu={closeOpenMenu}
            isOpenMenu={isOpenMenu}
            isEmail={isEmail}
            setIsEmail={setIsEmail}
            isName={isName}
            setIsName={setIsName}
            outputProfile={outputProfile}
          />
        </Route>
        <Route path="/movies" exact>
          <MoviesPage
            isLoggedIn={isLoggedIn}
            closeOpenMenu={closeOpenMenu}
            isOpenMenu={isOpenMenu}
            isCards={isCards}
          />
        </Route>
        <Route path="/saved-movies" exact>
          <SavedMoviesPage
            isLoggedIn={isLoggedIn}
            closeOpenMenu={closeOpenMenu}
            isOpenMenu={isOpenMenu}
          />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
