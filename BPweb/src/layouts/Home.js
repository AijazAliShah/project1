import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import BusinessPlugin from '../image/BusinessPlugin.png';
import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import {Link} from "react-router-dom";
let ps;

export default class Home extends Component {
    render(){
  
  return (
    <div className={styles.wrapper} >
       
        <nav style={{height: "60px"}} className="navbar navbar-expand-sm bg-dark navbar-dark ">
          {/* <!-- Brand/logo --> */}
          <a className="navbar-brand" href="#"><b>Business Plugin</b></a>
          
          {/* <!-- Links --> */}
          <ul className="navbar-nav ml-auto">
          <CardFooter >
          <Link to="/sign-in"><Button style={{backgroundColor:"#527ba9"}} >Sign In</Button></Link>
                      
                    </CardFooter>
                    <CardFooter >
                    <Link to="/join-us"><Button style={{backgroundColor:"#527ba9"}}>Join Us</Button></Link>
                      
                    </CardFooter>
          
          </ul>
        </nav>
<img src={BusinessPlugin} alt="Business Plugin" style={{width:"100%", height:"90vh"}} />
      {/* <Sidebar
        routes={routes}
        logoText={"Creative Tim"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      /> */}
      {/* <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        /> */}
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {/* {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )} */}
        {/* {getRoute() ? <Footer /> : null} */}
        {/* <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        /> */}
      {/* </div> */}
    </div>
  );
}
}
