import React from "react";
import { Route, Switch } from "react-router-dom";

import AboutProjectPage from "../../pages/AboutProject/AboutProjectPage";
import RegistrationPage from "../../pages/Registration/RegistrationPage";
import AuthenticationPage from "../../pages/Authentication/AuthenticationPage";
import NotFoundPage from "../../pages/NotFound/NotFoundPage";
import ProtectedPages from "../../pages/Protected/ProtectedPages";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <AboutProjectPage />
        </Route>
        <Route path="/sign-up" exact>
          <RegistrationPage />
        </Route>
        <Route path="/sign-in" exact>
          <AuthenticationPage />
        </Route>
        <ProtectedPages />
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
