import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Preloader from '../../components/Preloader/Preloader';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {props.isDownload
        ? <Preloader />
        : () => props.isLoggedIn
          ? <Component {...props} />
          : <Redirect to="/sign-in" />
      }
    </Route>
  )
}

export default ProtectedRoute;