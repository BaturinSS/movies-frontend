import './App.css';
import { TranslationContext } from '../../contexts/CurrentUserContext';
import React, { useState, useEffect } from "react";

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  const [isCurrentUser, setIsCurrentUser] = useState({});

  return (
    <TranslationContext.Provider value={isCurrentUser}>

      <Header />

      <Main />

      {/* <Footer /> */}

    </TranslationContext.Provider>
  );
}

export default App;
