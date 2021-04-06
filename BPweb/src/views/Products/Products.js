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
import axios from 'axios'
import firebase from 'firebase'

import baseUrl from '../../Config/BaseUrl'
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
        productName: "",
        price: "",
        discount: "",
        description: "",
        image:"",
        showImage: "",
        storeData: "",
        image: "",
        msg: "",
        msg1: "",
    }
  }

  componentWillMount(){
    var localData = reactLocalStorage.getObject('storeData')
    this.setState({storeData: localData})
    console.log("propd stire data", localData)
  }


  handleProductAdd(){
      if(this.state.productName){
        this.setState({ msg: ""})
        if(this.state.price){
           this.setState({ msg: ""})
          if(this.state.discount){
             this.setState({ msg: ""})
              if(this.state.description){
                this.setState({ msg: "", start: true })
                if(this.state.image){
                  this.setState({ msg: "", start: true })
            
                     
                                            axios.post(baseUrl+ 'add/product',{
                                              storeId: this.state.storeData._id,
                                              productName: this.state.productName,
                                              price: this.state.price,
                                              discount: this.state.discount ? this.state.discount : 0,
                                              productDescription: this.state.description,
                                              
                                            })
                                            .then((resp) => {
                                              console.log(resp)
                                              var file = this.state.image;
                                              var that = this

                                              //create a storage ref
                                              var storageRef = firebase.storage().ref('product_images/'+ resp.data.product._id+".jpg");

                                              //upload file 
                                              var task = storageRef.put(file);

                                              task.on('state_changed',
                                                function progress(snapshot){
                                                  var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
                                                 },
                                                function error(err){

                                                },
                                                function complete(err){
                                                  that.setState({msg1:"Product Added"})
                                                  setTimeout(() => {
                                                    window.location.reload()
                                                  }, 3000)
                                                
                                                }

                                                
                                              ); 
                                              
                                            })
                                        
                    
                        }else{
                          this.setState({msg: "Please Enter Image."})
                        }
                        }else{
                          this.setState({msg: "Please Enter Product Description."})
                        }
                       }else{
                        this.setState({msg: "Please Enter Email Discount."})
                      }
                    }else{
                      this.setState({msg: "Please Enter Price."})
                    }
                  }else{
                    this.setState({msg: "Please Enter Product Name."})
                  }
    
  }
  render(){
    console.log("sda",this.state)
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={styles.cardTitleWhite}>Add Products</h4>
              <p className={styles.cardCategoryWhite}>Have you add your products</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Product Name"
                    id="product-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                      onChange: (e) => this.setState({productName: e.target.value })
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Price"
                    id="price"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                      onChange: (e) => this.setState({price: e.target.value }),
                      type: "number"
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Discount %"
                    id="discount"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                      onChange: (e) => this.setState({discount: e.target.value }),
                      type: "number"
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Product Description"
                    id="product-description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                      onChange: (e) => this.setState({description: e.target.value })
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
             
              </GridContainer>
              <GridContainer md={12}>
                <button variant="contained" component="label" type="button"
                 style={{borderBottom: "4px solid lightgray",
                borderRight: "4px solid lightgray",
                borderTop: "1px solid black",
                borderLeft: "1px solid black",
                padding: "10px",
                margin: "15px",
                cursor: "pointer"}}>Uplode a Product Image:   <input type="file"
                onChange={(e) => this.setState({image: e.target.files[0], showImage: URL.createObjectURL(e.target.files[0]) })}
                ></input></button>
              </GridContainer>
              <GridContainer md={12}>
                {this.state.showImage ? <img src={this.state.showImage} /> : null}
              </GridContainer>
            </CardBody>
            <p style={{color: "red", textAlign: "center"}}>{this.state.msg}</p>
                  <p style={{color: "green", textAlign: "center"}}>{this.state.msg1}</p>
            <CardFooter>
              <Button color="primary" onClick={() => this.handleProductAdd()}>Add Product</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      {/* <button variant="contained" component="label" type="button" class="btn btn-default" >Uplode Image<input type="file"></input></button> */}
    </div>
  );
  }
}
