import './App.css';

import React from "react";
import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';


function App() {
  return (
    <>
      <Switch>

        <Route path="/" exact>
          <Header />
          <Main />
          <Footer />
        </Route>

        <Route path="/sign-up" exact>
          <h1>Hello, is Register!!!</h1>
        </Route>

        <Route path="/sign-in" exact>
          <h1>Hello, is Login!!!</h1>
        </Route>

        <Route path="/profile" exact>
          <h1>Hello, is Profile!!!</h1>
        </Route>

        <Route path="/movies" exact>
          <h1>Hello, is Movies!!!</h1>
        </Route>

        <Route path="/saved-movies" exact>
          <h1>Hello, is Movies-movies!!!</h1>
        </Route>

        <Route path="*">
          <NotFound />
        </Route>

      </Switch>
    </>
  );
}

export default App;
