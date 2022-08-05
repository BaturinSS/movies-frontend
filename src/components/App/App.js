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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isCards, setIsCards] = useState(moviesList || []);
  const [isEmail, setIsEmail] = useState(localStorage.getItem('login') || '');
  const [isName, setIsName] = useState('');

  const history = useHistory();

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
    if (!isOpenMenu) return;
    function handleOverlay(event) {
      if (event.target.classList.contains('popup_opened')
        || event.target.classList.contains('popup_close')) {
        closeOpenMenu();
      }
    };
    document.addEventListener("mousedown", handleOverlay);
    return () => document.removeEventListener("mousedown", handleOverlay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenMenu]);

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

  const onSubmitFormProfile = (event) => {
    event.preventDefault();
  }


  const outputProfile = () => {
    setIsLoggedIn(false);
    history.push('/');
    setIsName('');
  }

  const handleEmailChange = (event) => {
    setIsEmail(event.target.value);
  }

  const handleNameChange = (event) => {
    setIsName(event.target.value);
  }


  return (
    <>
      <Switch>
        <Route path="/" exact>
          <AboutProjectPage
            isLoggedIn={isLoggedIn}
            isOpenMenu={isOpenMenu}
            closeOpenMenu={closeOpenMenu}
          />
        </Route>
        <Route path="/sign-up" exact>
          <RegistrationPage
            isLoggedIn={isLoggedIn}
            isEmail={isEmail}
            setIsEmail={setIsEmail}
            isName={isName}
            setIsName={setIsName}
            handleNameChange={handleNameChange}
            handleEmailChange={handleEmailChange}
            onSubmitForm={onSubmitFormAuth}
          />
        </Route>
        <Route path="/sign-in" exact>
          <AuthenticationPage
            handleEmailChange={handleEmailChange}
            isLoggedIn={isLoggedIn}
            isEmail={isEmail}
            setIsEmail={setIsEmail}
            onSubmitForm={onSubmitFormLogin}
          />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage
            isLoggedIn={isLoggedIn}
            isOpenMenu={isOpenMenu}
            isEmail={isEmail}
            setIsEmail={setIsEmail}
            isName={isName}
            setIsName={setIsName}
            onSubmitFormProfile={onSubmitFormProfile}
            closeOpenMenu={closeOpenMenu}
            outputProfile={outputProfile}
          />
        </Route>
        <Route path="/movies" exact>
          <MoviesPage
            isLoggedIn={isLoggedIn}
            isOpenMenu={isOpenMenu}
            isCards={isCards}
            closeOpenMenu={closeOpenMenu}
          />
        </Route>
        <Route path="/saved-movies" exact>
          <SavedMoviesPage
            isLoggedIn={isLoggedIn}
            isOpenMenu={isOpenMenu}
            closeOpenMenu={closeOpenMenu}
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
