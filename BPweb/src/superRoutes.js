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
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import SuperLogout from "views/Superlogout/Superlogout.js";
import ActiveStore from "views/Activestores/Activestores.js";
import BlockedStore from "views/Blockedstores/Blockedstore.js";
import Superadmindashboard from "views/Superadmindashboard/Superadmindashboard.js";
import ourUsers from "views/ourUsers/ourUsers.js";

import Add from "@material-ui/icons/Add";
import Block from '@material-ui/icons/Block';
import ExitToApp from '@material-ui/icons/ExitToApp';
import StoresRequests from "views/StoreRequests/StoreRequests";
import Check from '@material-ui/icons/Check';
import User from '@material-ui/icons/AccountCircle';


const dashboardRoutes = [
  {
    path: "/Siperadmindashboard",
    name: "Super Dashboard",
    icon: Dashboard,
    component: Superadmindashboard,
    layout: "/superadmin"
  },
  {
    path: "/storeRequests",
    name: "Store Requests",
    icon: Add,
    component: StoresRequests,
    layout: "/superadmin"
  },
  {
    path: "/Activestores",
    name: "ActiveStores ",
    icon: Check,
    component: ActiveStore,
    layout: "/superadmin"
  },
  {
    path: "/Blockedstore",
    name: "Blocked Stores ",
    icon: Block,
    component: BlockedStore,
    layout: "/superadmin"
  },
  {
    path: "/ourUsers",
    name: "Our Users ",
    icon: User,
    component: ourUsers,
    layout: "/superadmin"
  },
  {
    path: "/Superlogout",
    name: "Logout ",
    icon: ExitToApp,
    component: SuperLogout,
    layout: "/superadmin"
  },
  ];

export default dashboardRoutes;
