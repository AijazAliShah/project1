import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import {Table,Button} from 'reactstrap'
import baseUrl from '../../Config/BaseUrl'
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
  }
 
  componentDidMount(){
    var localData = reactLocalStorage.getObject('storeData')
    this.setState({store: localData})

    axios.get(baseUrl+"get/one/order/"+localData._id+"/"+"5e6effec6ece66e012c67331")
    .then(resp => console.log("qr ret",resp.data))
    .then(err => console.log(err))
  }
        handleId = (data) =>{
          axios.put(baseUrl+"edit/order/picked/"+data)
        .then(resp =>{
          alert('Order Completed')
          window.location.reload()
        }
          )
.catch(err => console.log(err))
}
  handleScan = data => {

    if (data) {
      console.log(data)
      var localData = reactLocalStorage.getObject('storeData')
      this.setState({store: localData, data: data})
      axios.get("https://damp-beyond-36191.herokuapp.com/get/order/bynumber/"+data)
      .then(resp => {
        this.setState({order: resp.data})
        if(resp.data !== null){
          axios.get("https://damp-beyond-36191.herokuapp.com/wallet/amount/"+resp.data.userId+"/"+localData._id)
          .then(resp1 => {
            if(resp1.data !== null){
              this.setState({wallet: resp1.data.amount, Ewallet: resp1.data})
  
            }else{
              this.setState({wallet: 0, Ewallet: resp1.data})
  
            }
          
          })
        }else{
          this.setState({msg2: "No order found!"})
        }
     
      })
    }
  } 
  
  handleError = err => {
    console.error(err)
  }
  render() {
    console.log("dss",this.state)
    var totalAmount = 0
    if(this.state.order){
    for(var i=0; i< this.state.order.products.length; i++){
      totalAmount+=((parseFloat(this.state.order.products[i].product.price) - (parseFloat(this.state.order.products[i].product.price * this.state.order.products[i].product.discount)/100))* this.state.order.products[i].quantity)
    }
    }
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '35%' }}
        />
        {/* <p>{this.state.result}</p> */}

        {this.state.order && 
        <div style={{padding:'40px'}}>
        <div>
          <div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "center", margin : "auto"}}>
                <div style={{display: "flex", flexDirection: "column", width: "60%"}}>
                  <h2 style={{fontWeight: "bold", margin: "auto"}}>Order Details</h2>
                </div>
            </div>
            <div>
              
            </div>
          </div>
        </div>
        <div style={{display: "flex", flexDirection: "column"}}>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <p>
                Name: <b>  {this.state.order.name}</b> 
              </p>
              <p>
              Phone:  <b>{this.state.order.phone}</b> 
              </p>
          </div>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <p>
              Email:  <b>{this.state.order.email}</b> 
              </p>
              <p>
              {this.state.order.isHomeDelivery ? "Address(For Delivery):" + this.state.order.address : null}
              </p>
          </div>
          <div >
              <h6>
                Products
              </h6>
          </div>
          <div>
            {/* <p>{this.state.selectedProducts.length > 0 && this.state.selectedProducts[0].quantity}</p> */}
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
                      {this.state.order.products.length > 0 && this.state.order.products.map((prop, key) => (
                          <tr style={{textAlign: "center"}} key={key}>
                            <td>{key+1}</td>
                            <td>{prop.product.productName}</td>
                            <td>{prop.quantity}</td>
                            <td>{'pkr ' +(prop.product.price - ((prop.product.price * prop.product.discount)/100)) + ' / lb'}</td>
                            <td>{'pkr ' +(((prop.product.price - ((prop.product.price * prop.product.discount)/100))) * prop.quantity).toFixed(2)}</td>
                          </tr>
                      ))}
                      <tr style={{textAlign: "center"}} >
                          <td>{null}</td>
                          <td>{null}</td>
                          <td>{null}</td>
                          <td>Total</td>
                          <td>{"pkr "+ totalAmount}</td>
                      </tr>
                    </tbody>
                  </Table>
                  {/* <p style={{textAlign: "right", marginRight: 40}}>Total Amount: ${this.state.order.totAmount.toFixed(2)}</p> */}

          </div>
        </div>
        {/* <div>
                      <h4>E-Wallet Points: <b>{this.state.wallet}</b></h4>
                     <input placeholder= "Enter E-wallet Point" onChange={(e) => this.setState({cutAmount: e.target.value})}/>
                     <button onClick={() => {
                       if(parseInt(this.state.wallet) >= this.state.cutAmount){
                         console.log("if")
                          axios.put("https://damp-beyond-36191.herokuapp.com/edit/ewallet1/"+this.state.Ewallet._id+"/"+parseInt(parseInt(this.state.wallet)-parseInt(this.state.cutAmount)))
                          .then(resp => this.setState({msg1: "Amount deducted", wallet: parseInt(this.state.wallet)-parseInt(this.state.cutAmount)}))
                       }else{
                         this.setState({msg: "Not enough amount in E-Wallet"})
                       }
                      
                     }}>Deduct</button>
        </div>
        <div>
                      <h4>Add E-Wallet Points: <b>{this.state.wallet}</b></h4>
                     <input placeholder= "Enter E-wallet Point" onChange={(e) => this.setState({addAmount: e.target.value})}/>
                     <button onClick={() => {
                       if(parseInt(this.state.wallet) >= this.state.cutAmount){
                         console.log("if")
                          axios.put("https://damp-beyond-36191.herokuapp.com/edit/ewallet1/"+this.state.Ewallet._id+"/"+parseInt(parseInt(this.state.wallet)+parseInt(this.state.addAmount)))
                          .then(resp => this.setState({msg1: "Amount deducted", wallet: parseInt(this.state.wallet)+parseInt(this.state.addAmount)}))
                       }else{
                         this.setState({msg: "Not enough amount in E-Wallet"})
                       }
                      
                     }}>Add</button>
        </div> */}
        <div style={{textAlign:'right'}}>
                    <h6 style={{textAlign: "center", color: "red"}}>{this.state.msg}</h6>
                    <h6 style={{textAlign: "center", color: "green"}}>{this.state.msg1}</h6>
          <Button variant="secondary" onClick={() => this.handleId(this.state.data)}>
            Accept !
          </Button>
        </div>
        </div>
        }
                            <h6 style={{textAlign: "center", color: "red"}}>{this.state.msg2}</h6>

      </div>
    )
  }
}


