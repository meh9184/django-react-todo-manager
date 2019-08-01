import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/routing/AppliedRoute";
import AuthenticatedRoute from "./components/routing/AuthenticatedRoute";
import NotFound from "./components/routing/NotFound";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

export default ({ childProps }) =>
  <Switch>
    <AuthenticatedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <Route component={NotFound} />
</Switch>;
