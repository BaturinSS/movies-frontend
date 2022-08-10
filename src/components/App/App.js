import React, {useState, useEffect} from "react";
import {Route, Switch, useHistory} from 'react-router-dom';

import {disablePageScroll, enablePageScroll} from 'scroll-lock';

import AboutProjectPage from '../../pages/AboutProject/AboutProjectPage';
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
import AuthenticationPage from '../../pages/AuthenticationPage/AuthenticationPage';
import ProfilePage from '../../pages/Profile/ProfilePage';
import MoviesPage from '../../pages/Movies/MoviesPage';
import SavedMoviesPage from '../../pages/SavedMovies/SavedMoviesPage';
import NotFoundPage from '../../pages/NotFound/NotFoundPage';
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import moviesList from '../../components/utils/moviesList.json';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isCards, setIsCards] = useState(moviesList || []);
  const [isEmail, setIsEmail] = useState(localStorage.getItem('login') || '');
  const [isName, setIsName] = useState('');
  const [isDownload, setIsDownload] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isLinkImage, setIsLinkImage] = useState('');

  const history = useHistory();

  const openPopup = () => {
    setIsOpenMenu(true);
  };

  const openPopupImage = (linkImage) => {
    setIsLinkImage(linkImage);
    setIsOpenPopup(true);
  };

  const closePopup = () => {
    setIsOpenMenu(false);
  };

  const disableScroll = () => {
    disablePageScroll();
  };

  const enableScroll = () => {
    enablePageScroll();
  };

  useEffect(() => {
    if (!isOpenMenu) return enableScroll();
    disableScroll();
  }, [isOpenMenu, isDownload]);

  useEffect(() => {
    if (!isOpenMenu) {
      if (!isOpenPopup) return;
    }
    function handleOverlay(event) {
      if (event.target.classList.contains('popup_opened')
        || event.target.classList.contains('popup_close')
        || event.target.classList.contains('popup__image-cross')) {
        closePopup();
        setIsOpenPopup(false);
        setIsLinkImage('')
      }
    }
    document.addEventListener("mousedown", handleOverlay);
    return () => document.removeEventListener("mousedown", handleOverlay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenMenu, isOpenPopup]);

  const onSubmitFormLogin = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
    localStorage.setItem("login", event.target[0].value);
    history.push('/movies');
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

  const handleClickZoomImage = (event) => {
    const elementBlock = event.target.parentElement.parentElement;
    const linkImage = elementBlock.querySelector('.movies-list__image').src;
    openPopupImage(linkImage)
  }

  const handleClickPlayVideo =()=>{
    setIsOpenPopup(true);
    console.log('play')
  }

  return (
    <>
      {isDownload && <Preloader/>}
      <Switch>
        <Route path="/" exact>
          <AboutProjectPage
            isLoggedIn={isLoggedIn}
            isOpenMenu={isOpenMenu}
            closePopup={closePopup}
            openPopup={openPopup}
          />
        </Route>
        <Route path="/sign-up" exact>
          <RegistrationPage
            isLoggedIn={isLoggedIn}
            isEmail={isEmail}
            isName={isName}
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
            onSubmitForm={onSubmitFormLogin}
          />
        </Route>
        <ProtectedRoute
          exact
          path="/profile"
          component={ProfilePage}
          isLoggedIn={isLoggedIn}
          isOpenMenu={isOpenMenu}
          isEmail={isEmail}
          setIsEmail={setIsEmail}
          isName={isName}
          setIsName={setIsName}
          onSubmitFormProfile={onSubmitFormProfile}
          closePopup={closePopup}
          openPopup={openPopup}
          outputProfile={outputProfile}
        />
        <ProtectedRoute
          exact
          path="/movies"
          component={MoviesPage}
          isLoggedIn={isLoggedIn}
          isOpenMenu={isOpenMenu}
          isCards={isCards}
          closePopup={closePopup}
          openPopup={openPopup}
          isOpenPopup={isOpenPopup}
          handleClickPlayVideo={handleClickPlayVideo}
          handleClickZoomImage={handleClickZoomImage}
          isLinkImage={isLinkImage}
        />
        <ProtectedRoute
          exact
          path="/saved-movies"
          component={SavedMoviesPage}
          isLoggedIn={isLoggedIn}
          isOpenMenu={isOpenMenu}
          closePopup={closePopup}
          openPopup={openPopup}
          isCards={isCards}
        />
        <Route path="*">
          <NotFoundPage/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
