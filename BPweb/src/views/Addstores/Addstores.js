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
import Geocode from "react-geocode";
import axios from 'axios'
import firebase from 'firebase'
import {Link} from "react-router-dom";

import baseUrl from '../../Config/BaseUrl'
Geocode.setApiKey("AIzaSyCYwrgArmp1NxJsU8LsgVKu5De5uCx57dI");
 
// set response language. Defaults to english.
Geocode.setLanguage("en");

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
        storeName: "",
        ownerName: "",
        emailAddress: "",
        phoneNumber: "",
        storeAddress:"",
        userName:"",
        password:"",
        confirmPassword:"",
        image:"",
        showImage: "",
        msg: "",
        msg1: "",
    }
  }

  handleRequest(){
    if(this.state.storeName ){
      this.setState({ msg: ""})
      if(this.state.ownerName){
         this.setState({ msg: ""})
        if(this.state.emailAddress){
           this.setState({ msg: ""})
            if(this.state.phoneNumber){
               this.setState({ msg: ""})
              if(this.state.storeAddress){
                 this.setState({ msg: ""})
                 if(this.state.userName){
                         this.setState({ msg: ""})
                        if(this.state.password === this.state.confirmPassword && this.state.password){
                           this.setState({ msg: ""})
                            if(this.state.image){
                              // if(  && this.state.errMsg1 === ""){
                              this.setState({loading: true, msg: "", start: true})


                              Geocode.fromAddress(this.state.storeAddress).then(
                                response => {
                                  const { lat, lng } = response.results[0].geometry.location;
                                  console.log(lat, lng);
                               
                                        axios.get(baseUrl+'api/users/exist/' + this.state.userName
                                        )
                                        .then(resp => {
                                            if(resp.data !== 'User already exists!'){
                                                    axios.post(baseUrl+'add/store',{
                                                      storeName: this.state.storeName, 
                                                      ownerName: this.state.ownerName,
                                                      emailAddress: this.state.emailAddress,
                                                      phoneNumber: this.state.phoneNumber,
                                                      storeAddress: this.state.storeAddress,
                                                      userName: this.state.userName,
                                                      password: this.state.password,
                                                      lat: lat,
                                                      lng: lng,
                                                      aboutStore: this.state.aboutStore,
                                                    })
                                                    .then((resp) => {
                                                      console.log(resp)
                                                      var file = this.state.image;
                                                      var that = this

                                                      //create a storage ref
                                                      var storageRef = firebase.storage().ref('store_images/'+ resp.data.store._id+".jpg");

                                                      //upload file 
                                                      var task = storageRef.put(file);

                                                      task.on('state_changed',
                                                        function progress(snapshot){
                                                          var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
                                                         },
                                                        function error(err){

                                                        },
                                                        function complete(err){
                                                          that.setState({msg1:"Store request sent"})
                                                          setTimeout(() => {
                                                            window.location.reload()
                                                          }, 3000)
                                                        
                                                        }

                                                        
                                                      ); 

                                                     
                                                  
                                                    

                                                    })
                                                    .catch((err) => console.log(err))


                                                  }else{
                                                    this.setState({msg: "UserName already exist", loading: false})
                                                }
                                            })
                                            .catch((err) => console.log(err))

                                },
                                error => {
                                    this.setState({msg: "Location is not correct", loading: false})
                                }
                              );
                                        }else{
                                          this.setState({msg: "Please Upload Picture."})
                                        }
                                    }else{
                                      this.setState({msg: "Password does not match."})
                                    }
                                  }else{
                                    this.setState({msg: "Please Enter Email/UserName."})
                                  }
                          }else{
                            this.setState({msg: "Please Enter Store Address."})
                          }
                        }else{
                          this.setState({msg: "Please Enter Phone Number."})
                        }
                    }else{
                      this.setState({msg: "Please Enter Email Address."})
                    }
                  }else{
                    this.setState({msg: "Please Enter Owner Name."})
                  }
                }else{
                  this.setState({msg: "Please Enter Store Name."})
                }
              

  }

  render(){
    console.log("sda",this.state)
  return (
    <div>
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
      <GridContainer >
        <GridItem xs={12} sm={12} md={12}>
          <Card style={{minHeight: "700px"}}>
            <CardHeader color="primary">
              <h4 className={styles.cardTitleWhite}>Add Stores</h4>
              <p className={styles.cardCategoryWhite}>Here you can add your Store</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Store Name"
                    id="store-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                      onChange: (e) => this.setState({storeName: e.target.value })
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Owner Name"
                    id="owner-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                      onChange: (e) => this.setState({ownerName: e.target.value }),
                      
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email Address"
                    id="email-adddress"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                      onChange: (e) => this.setState({emailAddress: e.target.value }),
                      
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Phone Number"
                    id="phone-number"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                      onChange: (e) => this.setState({phoneNumber: e.target.value }),
                      type:"number"
                      
                    }}
                  />
                </GridItem>
              </GridContainer>
             
             
              {/* </GridContainer> */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Store Address"
                    id="store-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                      onChange: (e) => this.setState({storeAddress: e.target.value })
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
             
              </GridContainer>
              <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email/Username"
                    id="email-username"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                      onChange: (e) => this.setState({userName: e.target.value }),
                      
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                      onChange: (e) => this.setState({password: e.target.value }),
                      type:"password"
                    
                      
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Confirm Password"
                    id="confirm-password"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                      onChange: (e) => this.setState({confirmPassword: e.target.value }),
                      type:"password"
                      
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer md={12} style={{display:"flex", justifyContent:"center"}}>
                <button variant="contained" component="label" type="button"
                 style={{borderBottom: "4px solid lightgray",
                borderRight: "4px solid lightgray",
                borderTop: "1px solid black",
                borderLeft: "1px solid black",
                padding: "10px",
                backgroundColor:"#527ba9",
                color:"#fff",
                margin: "15px",
                cursor: "pointer"}}>Uplode Store Image here :   <input type="file"
                onChange={(e) => this.setState({image: e.target.files[0], showImage: URL.createObjectURL(e.target.files[0]) })}
                ></input></button>
              </GridContainer>
              <GridContainer md={12} style={{display: "flex", justifyContent: "center"}}>
                {this.state.showImage ? <img src={this.state.showImage} /> : null}
              </GridContainer>
            </CardBody>
                  <p style={{color: "red", textAlign: "center"}}>{this.state.msg}</p>
                  <p style={{color: "green", textAlign: "center"}}>{this.state.msg1}</p>
            <CardFooter style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Button color="primary" onClick={() => this.handleRequest()}>Send Request</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
  }
}
