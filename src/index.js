import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.jsx";
import RtlLayout from "layouts/RTL.jsx";
import AdminLayout from "layouts/Admin.jsx";

import "assets/scss/material-dashboard-pro-react.scss?v=1.7.0";
import "assets/custom.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter history={hist} basename="/madm04">
    <Switch>
      <Route path="/rtl" component={RtlLayout} />
      <Route path="/auth" component={AuthLayout} />
      <Route path={"/admin"} component={AdminLayout} />
      <Redirect from="/" to={"/admin/dashboard"} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
