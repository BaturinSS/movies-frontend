import './App.css';

import { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';

import { disablePageScroll, enablePageScroll } from 'scroll-lock';

//* Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

//* Pages
import AboutProjectPage from '../../pages/AboutProject/AboutProjectPage';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import AuthenticationPage from '../../pages/AuthenticationPage/AuthenticationPage';
import NotFoundPage from '../../pages/NotFound/NotFoundPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

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

  const onSubmitForm = () => {
    console.log('submit')
  }

  return (
    <>
      <Switch>

        <Route path="/" exact>
          <AboutProjectPage
            Header={Header}
            Footer={Footer}
            isLoggedIn={isLoggedIn}
            closeOpenMenu={closeOpenMenu}
            isOpenMenu={isOpenMenu}
          />
        </Route>

        <Route path="/sign-up" exact>
          <RegistrationPage
            Header={Header}
            isLoggedIn={isLoggedIn}
            closeOpenMenu={closeOpenMenu}
            isOpenMenu={isOpenMenu}
            onSubmitForm={onSubmitForm}
          />
        </Route>

        <Route path="/sign-in" exact>
          <AuthenticationPage
            Header={Header}
            isLoggedIn={isLoggedIn}
            closeOpenMenu={closeOpenMenu}
            isOpenMenu={isOpenMenu}
            onSubmitForm={onSubmitForm}
          />
        </Route>

        <Route path="/profile" exact>
          <Header
            isLoggedIn={isLoggedIn}
            closeOpenMenu={closeOpenMenu}
            isOpenMenu={isOpenMenu}
          />
          <h1>Hello, is Profile!!!</h1>
        </Route>

        <Route path="/movies" exact>
          <Header
            isLoggedIn={isLoggedIn}
            closeOpenMenu={closeOpenMenu}
            isOpenMenu={isOpenMenu}
          />
          <h1>Hello, is Movies!!!</h1>
          <Footer />
        </Route>

        <Route path="/saved-movies" exact>
          <Header
            isLoggedIn={isLoggedIn}
            closeOpenMenu={closeOpenMenu}
            isOpenMenu={isOpenMenu}
          />
          <h1>Hello, is Saved-movies!!!</h1>
          <Footer />
        </Route>

        <Route path="*">
          <NotFoundPage />
        </Route>

      </Switch>
    </>
  );
}

export default App;
