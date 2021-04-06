import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from 'axios'
import baseUrl from '../../Config/BaseUrl'
import MyPost from '../../image/MyPost.png';
import {reactLocalStorage} from 'reactjs-localstorage';
import {Link} from "react-router-dom";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};


export default class Products extends Component{
  constructor(props){
    super(props)
    this.state={
        userName: "",
        password: "",
        msg: ""
        
    }
  }
  
   handleLogin(){
    if(this.state.userName ){
      this.setState({ msg: ""})
    if(this.state.password){
        this.setState({ msg: ""})
        axios.get(baseUrl+'get/store/login/' + this.state.userName+"/"+this.state.password)
          .then(resp => {
            console.log(resp.data)
              if(resp.data !== null){
                      reactLocalStorage.setObject('storeData', resp.data);
                      // var localData = reactLocalStorage.getObject('storeData')
                      setTimeout(() => {
                        window.location= "/admin/dashboard/"+resp.data._id
                      }, 1500)
                    }else{
                      this.setState({msg: "Incorrect Credentials"})
                    }
                  })

                             
                  }else{
                    this.setState({msg: "Please Enter password."})
                  }
                }else{
                  this.setState({msg: "Please Enter Email."})
                }
   }
  render(){
    console.log("sda",this.state)
  return (
    <div style={{backgroundImage: `url(${MyPost})`, width:"100vw", height:"100vh"}}>
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
        <div>
      <GridContainer style={{display: "flex", justifyContent: "center", paddingTop:"100px",}}>
        <GridItem xs={6} sm={6} md={6}>
          <Card>
            <CardHeader color="primary" style={{display: "flex", justifyContent: "center"}}>
              <h2 className={styles.cardTitleWhite}>SIGN IN</h2>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Email"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                      onChange: (e) => this.setState({userName: e.target.value })
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                      onChange: (e) => this.setState({password: e.target.value }),
                      
                      type: "password"
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <p style={{color: "red", textAlign: "center"}}>{this.state.msg}</p>

            <CardFooter style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Button color="primary" onClick={() => this.handleLogin()}>Sign In</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      </div>
    </div>
  );
  }
}
