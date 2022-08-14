import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Preloader from '../../components/Preloader/Preloader';

const ProtectedRoute = ({ isLoggedIn, isDownload, component: Component, ...props }) => {

  return (
    <Route>
      {isDownload
        ? <Preloader />
        : () => isLoggedIn
          ? <Component {...props} />
          : <Redirect to={props.redirect} />
      }
    </Route>
  )
}

export default ProtectedRoute;
