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
import {reactLocalStorage} from 'reactjs-localstorage';

import avatar from "assets/img/faces/avtar.png";
import axios from "axios";

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
        emailAddress: "",
        wuser: [],
        amount: 0
    }
  }

  render(){
    console.log("sda",this.state)
    var localData = reactLocalStorage.getObject('storeData')
    console.log("StoreDta", localData)
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={styles.cardTitleWhite}>E - wallet</h4>
              <p className={styles.cardCategoryWhite}>E-wallet Registration</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={11}>
                  <CustomInput
                    labelText="Email/Phone number"
                    id="email-phone"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                      onChange: (e) => this.setState({emailAddress: e.target.value })
                    }}
                  />
                </GridItem>
               < CardFooter style={{ display: "flex", justifyContent: "center", alignItems: "right"}} >
              <Button color="primary" onClick={() => {
                axios.get('https://damp-beyond-36191.herokuapp.com/get/wallet/user/'+this.state.emailAddress)
                .then(resp => this.setState({wuser: resp.data}))
                .catch(err => console.log(err))
              }}>Find</Button>
            </CardFooter>
            
              </GridContainer>
    
            </CardBody>
          </Card>
        </GridItem>
         
      </GridContainer>
      <h6 style={{color: "green", textAlign: "center"}}>{this.state.msg}</h6>

      {this.state.wuser.length > 0 ? (

      
      <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={styles.cardCategory}>{this.state.wuser[0].name}</h4>
              <h6 className={styles.cardTitle}>{this.state.wuser[0].email}</h6>
              <h6 className={styles.cardTitle}>{this.state.wuser[0].mobile}</h6>

              <p className={styles.description}>
              {this.state.wuser[0].address}
              </p>

              <CustomInput
                    labelText="E-Wallet Points"
                    id="E-Wallet Points"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                      onChange: (e) => this.setState({amount: e.target.value })
                    }}
                  />
              <Button color="primary" round onClick={() => {
                if(localData.storeName === "Imtiaz"){
                  axios.post("https://damp-beyond-36191.herokuapp.com/add/imtiaz/EWallet",{
                    name: this.state.wuser[0].name,
                    token: this.state.amount,
                    storeName: localData.storeName,
                    userID: this.state.wuser[0]._id
                  }).then(resp => {
                    console.log("S",resp.data)
                    this.setState({msg: "E-wallet added Successfully", wuser: []})
                  })
                }else{
                  if(localData.storeName === "Wallmart"){
                    axios.post("https://damp-beyond-36191.herokuapp.com/add/walmart/EWallet",{
                      name: this.state.wuser[0].name,
                      token: this.state.amount,
                      storeName: localData.storeName,
                      userID: this.state.wuser[0]._id
                    }).then(resp => {
                      console.log("S",resp.data)
                      if(resp.data.message === "User exist"){
                        this.setState({msg: "User Exist already", wuser: []})
                      }else{
                        this.setState({msg: "E-wallet added Successfully", wuser: []})
                      }
                    })
                  }else{
                    if(localData.storeName === "Haseeb"){
                      axios.post("https://damp-beyond-36191.herokuapp.com/add/haseeb/EWallet",{
                        name: this.state.wuser[0].name,
                        token: this.state.amount,
                        storeName: localData.storeName,
                        userID: this.state.wuser[0]._id
                      }).then(resp => {
                        console.log("S",resp.data)
                        this.setState({msg: "E-wallet added Successfully", wuser: []})
                      })
                    }
                  }
                }
               
              }}>
                  Register E/wallet
              </Button>
            </CardBody>
          </Card>
         ): <h4 style={{textAlign: "center"}}>No User</h4>}
    </div>
  );
  }
}
