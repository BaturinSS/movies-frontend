import './App.css';

import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from 'react-router-dom';

import { disablePageScroll, enablePageScroll } from 'scroll-lock';

//* Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

//* Pages
import AboutProjectPage from '../../pages/AboutProject/AboutProjectPage';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import AuthenticationPage from '../../pages/AuthenticationPage/AuthenticationPage';
import ProfilePage from '../../pages/Profile/ProfilePage';
import NotFoundPage from '../../pages/NotFound/NotFoundPage';

function App() {
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const [
    isEmail,
    setIsEmail,
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
            Header={Header}
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
            Header={Header}
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
