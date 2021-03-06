/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import SuperAdmin from "layouts/SuperAdmin.js";
import RTL from "layouts/RTL.js";
import Home from "layouts/Home.js";
import EditProduct from "layouts/EditProduct.js";
import AddStores from "views/Addstores/Addstores.js";
import Signin from "views/Signin/Signin.js"
import Fire from './Config/Fire'

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/superadmin" component={SuperAdmin} />
      <Route path="/join-us" component={AddStores} />
      <Route path="/sign-in" component={Signin} />
      <Route path="/editProduct/:id" component={EditProduct} />

      

      {/* <Route path="/rtl" component={RTL} /> */}
      <Redirect from="/" to="/home" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
