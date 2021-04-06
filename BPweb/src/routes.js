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
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import AddProducts from "views/Products/Products.js";
import EditProducts from "views/Editproduct/Editproducts.js";
import NewOrders from "views/Newordes/Neworders.js";
import ProcessingOrders from "views/Processingorders/Processingorders.js";
import CompleteOrders from "views/Completeorders/Completeorders.js";
import ReadyOrders from "views/Readyorders/Readyorders.js";
import AddEwalet from "views/Addewalet/Addewalet.js";
import EWScanner from "views/EWScanner/EWScanner";
import QrReader from "views/Qrreader/Qrreader.js";
import LogOut from "views/Logout/Logout.js";
import Add from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import LineWeight from "@material-ui/icons/LineWeight";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Check from '@material-ui/icons/Check';
import DoneAll from '@material-ui/icons/DoneAll';
import Visibility from '@material-ui/icons/Visibility';
import CropFree from '@material-ui/icons/CropFree';
import ExitToApp from '@material-ui/icons/ExitToApp';



const dashboardRoutes = [
  {
    path: "/dashboard/:id",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/Products",
    name: "Add Products",
    icon: Add,
    component: AddProducts,
    layout: "/admin"
  },
  {
    path: "/Editproduct",
    name: "Edit Products",
    icon: Edit,
    component: EditProducts,
    layout: "/admin"
  },
  {
    path: "/Neworders",
    name: "New Orders",
    icon: LineWeight,
    component: NewOrders,
    layout: "/admin"
  },
  {
    path: "/Processingorders",
    name: "Processing Orders",
    icon: HourglassEmptyIcon,
    component: ProcessingOrders,
    layout: "/admin"
  },
  {
    path: "/Readyorders",
    name: "Ready Orders",
    icon: Check,
    component: ReadyOrders,
    layout: "/admin"
  },
  {
    path: "/Completeorders",
    name: "Complete Orders",
    icon: DoneAll,
    component: CompleteOrders,
    layout: "/admin"
  },
  {
    path: "/Addewalet",
    name: "Add Ewallet",
    icon: Add,
    component: AddEwalet,
    layout: "/admin"
  },
  // {
  //   path: "/Viewewalet",
  //   name: "View Ewallet",
  //   icon: Visibility,
  //   component: ViewEwalet,
  //   layout: "/admin"
  // },
  {
    path: "/Qrreader",
    name: "QR Reader",
    icon: CropFree,
    component: QrReader,
    layout: "/admin"
  },
  {
    path: "/e-wallet-scanner",
    name: "E-Wallet Scanner",
    icon: CropFree,
    component: EWScanner,
    layout: "/admin"
  },
  {
    path: "/Logout",
    name: "Logout",
    icon: ExitToApp,
    component: LogOut,
    layout: "/admin"
  },
  
  ];

export default dashboardRoutes;
