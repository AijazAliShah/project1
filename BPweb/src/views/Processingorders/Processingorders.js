import React, {Component} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios'
import { Modal, Button } from "reactstrap";
import {Link} from "react-router-dom"
import baseUrl from '../../Config/BaseUrl'
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};


export default class editproducts extends Component {
  constructor(items){
    super(items)
    this.state={
      orders: [],
      rowData: "",
      selectedProducts: "",
      totAmount: "",
      todaysOrders: "",
      show: false, 
    }
  }
  handleClose(){ this.setState({show: false})};

  componentDidMount(){
    var localData = reactLocalStorage.getObject('storeData')
    this.setState({storeData: localData})
    console.log("itemd stire data", localData)

    axios.get(baseUrl+ "get/all/preparation/orders/"+localData._id)
    .then(resp => {
        console.log(resp)
        this.setState({orders: resp.data, loading: false})
    })
    .catch(err => console.log(err))
  }
  render(){
    console.log("Orders",this.state)
    var availQuantity = []   
    var localData = reactLocalStorage.getObject('storeData')

    var data = this.state.orders.map((item,index) => (
      [item.orderNumber.toUpperCase(), "pkr "+item.totalAmount, item.name, item.email,
      <div>
        <Button variant="secondary"onClick={() => {
       console.log("Shkjahskldhaklshdk")
       axios.put(baseUrl+ "edit/order/ready/"+item._id)
       .then(resp => window.location.reload())
       .catch(err => console.log(err))

     }
   }>
           Ready
 </Button>
      </div>
  
    
     ]
    ))

  return (
    <div>
     <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={styles.cardTitleWhite}>Active Stores</h4>
            <p className={styles.cardCategoryWhite}>
              Here you can see all Active Stores
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Order Number", "Amount", "Name", "email", "Action"]}
              tableData={
                data
              }
            />
          </CardBody>
        </Card>
      </GridItem>
     
    </GridContainer>
 <Modal show={this.state.show} onHide={() => this.handleClose()}>
 <Modal.Header closeButton>
   <Modal.Title>
     <div style={{display: "flex", flexDirection: "row", justifyContent: "center", margin : "auto"}}>
         <div style={{display: "flex", flexDirection: "column", width: "60%"}}>
           <h2 style={{fontWeight: "bold", margin: "auto"}}>Order Details</h2>
           <h6 style={{fontWeight: "bold", margin: "auto"}}>Order# {this.state.rowData.orderNumber}</h6>
         </div>
     </div>
     <div>
       
     </div>
   </Modal.Title>
 </Modal.Header> 
 <Modal.Body style={{display: "flex", flexDirection: "column"}}>
   <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
       <p>
         Name: <b>  {this.state.rowData.name}</b> 
       </p>
       <p>
       Phone:  <b>{this.state.rowData.phone}</b> 
       </p>
   </div>
   <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
       <p>
       Email:  <b>{this.state.rowData.email}</b> 
       </p>
       <p>
       Address: <b>{this.state.rowData.address}</b>  
       </p>
   </div>
   <div >
       <h6>
         Products
       </h6>
   </div>
   <div>
   <Table striped hover>
             <thead>
               <tr style={{textAlign: "center"}}>
                 <th style={{textAlign: "center"}}>ID</th>
                 <th style={{textAlign: "center"}}>Product Name</th>
                 <th style={{textAlign: "center"}}>Quantity</th>
                 <th style={{textAlign: "center"}}>Amount</th> 
                 <th style={{textAlign: "center"}}>Total Amount</th>
                 
               </tr>
             </thead>
             <tbody>
               {this.state.selectedProducts.length > 0 && this.state.selectedProducts.map((item, key) => (
                   <tr style={{textAlign: "center"}} key={key}>
                     {console.log("itemitemitem",item)}
                     <td>{key+1}</td>
                     <td>{item.product.productName}</td>
                     <td>{item.quantity}</td>
                     <td>{'$' +(item.product.price - ((item.product.price * item.product.discount)/100)).toFixed(2) + ' / lb'}</td>
                     <td>{'$' +(((item.product.price - ((item.product.price * item.product.discount)/100))) * item.quantity).toFixed(2)}</td>
               
                   </tr>
               ))}
             </tbody>
           </Table>
           {/* <p style={{textAlign: "right", marginRight: 40}}>Total Amount: ${this.state.totAmount.toFixed(2)}</p> */}

   </div>
 </Modal.Body>
 <Modal.Footer>
   <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
   <Link onClick={() => this.setState({showTodaysOrder: true, show: false})} style={{display: "flex", flexDirection: "row"}}>
     <h6 style={{color: "green"}}>You have total </h6>
     <span >{this.state.todaysOrders === "" ? 
     <span style={{textAlign: "center", marginTop: 10}}>
     </span>
                   : <h6 style={{color: "green", marginLeft: 3, marginRight: 3}}>{" "+this.state.todaysOrders.length+" "} </h6>}</span>
                   <h6 style={{color: "green"}}> orders today.</h6></Link>
   <div>
 <Button variant="secondary"onClick={() => {
       console.log("Shkjahskldhaklshdk")
           // axios.put(baseUrl+"edit/product/quantity/1",{
           //   products: this.state.availQuantity
           // })
           // .then(resp => {
             // console.log("up",resp.data)
           axios.put(baseUrl+"get/orders/isrejected/"+this.state.rowData._id)
           .then(resp => {
                 console.log("upeeee",resp.data)
                 
                 if(resp.data === false){
                   axios.put(baseUrl+"edit/order/accept/"+this.state.rowData._id)
                   .then(resp => {
                     console.log(resp.data)
                     window.location.reload()
                   })
                   .catch(err => console.log(err))
                 }else{
                   window.location.reload()
                 }
               
           })
           .catch(err => console.log(err))

     }
   }>
           {/* <i className="fa fa-check-square" style={{fontSize: "20px"}} /> */}
           Accept
 </Button>
 <Button variant="secondary"onClick={() => 
     axios.put(baseUrl+"edit/order/reject/"+this.state.rowData._id)
     .then(resp => window.location.reload())
     .catch(err => console.log(err))
     }>
     {/* <i className="fa fa-trash" style={{fontSize: "20px"}} /> */}
         Decline
 </Button>
   <Button variant="secondary" onClick={() => this.handleClose()}>
     Close
   </Button>
   </div>
   </div>
 </Modal.Footer>
</Modal>
    </div>
  );
}
}
