import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import {Table,Button} from 'reactstrap'
import baseUrl from '../../Config/BaseUrl'
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import avatar from "assets/img/faces/avtar.png";

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



export default class Test extends Component {
  state = {
    result: 'No result',
    store: {},
    order:'',
    data: "",
    wallet: 0,
    cutAmount: 0,
    Ewallet: "",
    addAmount: "",
    msg: "",
    msg1: "",
    msg2: "",
    tokenData: '',
    tokenAmount: "",
    aa: "22",
    userID: ""
  }
 
  componentDidMount(){
    var localData = reactLocalStorage.getObject('storeData')
    this.setState({store: localData})
    
}
  handleScan = data => {
    console.log("data",data)
    if (data !== null) {
      console.log(data)
      var r = data.split("$");
      data = r[1]
      var localData = reactLocalStorage.getObject('storeData')
      this.setState({store: localData, data: data, userID: data})

      if(localData.storeName === "Haseeb Mart"){

        axios
        .get(
          "https://damp-beyond-36191.herokuapp.com/haseeb/"+data
        )
        .then((resp) => {
            console.log("i got the response", resp.data)
            this.setState({tokenData: resp.data, tokenAmount: resp.data.token})
        });
    
      }else if(localData.storeName === "Wallmart"){
        axios
        .get(
          "https://damp-beyond-36191.herokuapp.com/walmart/"+data
        )
        .then((resp) => {
            console.log("i got the response", resp.data)
            this.setState({tokenData: resp.data, tokenAmount: resp.data.token})
            
        });
      }else if(localData.storeName === "Imtiaz"){
        axios
        .get(
          "https://damp-beyond-36191.herokuapp.com/imtiaz/"+data
        )
        .then((resp) => {
            console.log("i got the response", resp.data)
            this.setState({tokenData: resp.data, tokenAmount: resp.data.token})
        });
      }

    }
  } 
  
  handleError = err => {
    console.error(err)
  }
  render() {
    console.log("dss",this.state)
    return (
      <div>
      
        {this.state.tokenData ? (

                  <Card profile>
                  <CardAvatar profile>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img src={avatar} alt="..." />
                    </a>
                  </CardAvatar>
                  <CardBody profile>
                    <h4 className={styles.cardCategory}>{this.state.tokenData.name}</h4>

                    <CustomInput
                          labelText="E-Wallet Points"
                          id="E-Wallet Points"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            onChange: (e) => this.setState({tokenAmount: e.target.value }),
                            value: this.state.tokenAmount
                          }}
                        />
                    <Button color="primary" round onClick={() => {

                            if(this.state.store.storeName === "Haseeb Mart"){

                              axios.put("https://damp-beyond-36191.herokuapp.com/edit/haseeb/EWallet/"+this.state.userID,{
                                token: this.state.tokenAmount
                              }).then(resp => {
                                console.log("S",resp.data)
                                this.setState({msg: "E-wallet change Successfully", wuser: []})

                                setTimeout(() => {
                                  window.location.reload()
                                }, 2000)
                              })

                            }else if(this.state.store.storeName === "Wallmart"){
                              axios.put("https://damp-beyond-36191.herokuapp.com/edit/walmart/EWallet/"+this.state.userID,{
                                  token: this.state.tokenAmount
                                }).then(resp => {
                                  console.log("S",resp.data)
                                  this.setState({msg: "E-wallet change Successfully", wuser: []})
                                  
                                setTimeout(() => {
                                  window.location.reload()
                                }, 2000)
                                })
                            }else if(this.state.store.storeName === "Imtiaz"){
                              axios.put("https://damp-beyond-36191.herokuapp.com/edit/imtiaz/EWallet/"+this.state.userID,{
                                  token: this.state.tokenAmount
                                }).then(resp => {
                                  console.log("S",resp.data)
                                  this.setState({msg: "E-wallet change Successfully", wuser: []})
                                  
                                setTimeout(() => {
                                  window.location.reload()
                                }, 2000)
                                })
                            }
                      


                    }}>
                        Change Amount
                    </Button>
                  </CardBody>
                  </Card>


        ) : (
          <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '35%' }}
        />

        ) 
        }
        <h6 style={{textAlign: "center", color: "green"}}>{this.state.msg}</h6>
        <h6 style={{textAlign: "center", color: "red"}}>{this.state.msg2}</h6>

      </div>
    )
  }
}


