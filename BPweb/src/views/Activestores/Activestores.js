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
import axios from 'axios'
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


export default class StoresRequests extends Component {

    constructor(props){
        super(props)
        this.state={
            allRequests: []
        }
      }

      componentDidMount(){
        axios.get(baseUrl+'get/store/active/')
        .then(resp => {
          console.log(resp.data)
           this.setState({allRequests: resp.data})
                })
      }
  render(){
      var data = this.state.allRequests.map((item,index) => (
        [item.storeName, item.ownerName, item.emailAddress, item.storeAddress, <button onClick={() => {
          axios.put(baseUrl+'make/store/block/'+item._id)
          .then(resp => window.location.reload())
      }}>Block</button>
    ]
      ))
  return (
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
              tableHead={["Name", "Owner", "Email", "Address", "Action"]}
              tableData={
                data
              }
            />
          </CardBody>
        </Card>
      </GridItem>
     
    </GridContainer>
  );
}
}
