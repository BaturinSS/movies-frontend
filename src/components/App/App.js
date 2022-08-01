import './App.css';

import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import scrollLock from 'scroll-lock';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const isOpen = isOpenMenu;

  const disableScroll = () => {
    scrollLock.disablePageScroll();
  };

  const enableScroll = () => {
    scrollLock.enablePageScroll();
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
      if (event.target.classList.contains('header__items_opened')
        || event.target.classList.contains('header__close-menu')) {
        closeOpenMenu();
      }
    };
    document.addEventListener("mousedown", handleOverlay);
    return () => document.removeEventListener("mousedown", handleOverlay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <Switch>

        <Route path="/" exact>
          <Header
            isLoggedIn={isLoggedIn}
            closeOpenMenu={closeOpenMenu}
            isOpenMenu={isOpenMenu}
          />
          <Main />
          <Footer />
        </Route>

        <Route path="/sign-up" exact>
          <Header
            isLoggedIn={isLoggedIn}
            closeOpenMenu={closeOpenMenu}
            isOpenMenu={isOpenMenu}
          />
          <h1>Hello, is Register!!!</h1>
        </Route>

        <Route path="/sign-in" exact>
          <Header
            isLoggedIn={isLoggedIn}
            closeOpenMenu={closeOpenMenu}
            isOpenMenu={isOpenMenu}
          />
          <h1>Hello, is Login!!!</h1>
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
          <NotFound />
        </Route>

      </Switch>
    </>
  );
}

export default App;
