import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";


import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";

const UseRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/home">
         <Home/>
        </Route>
        <Redirect to="/home" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/">
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default UseRoutes;