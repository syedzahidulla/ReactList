import React from 'react';
import './style.css'
import BodyComponent from './bodyComponent';
import Footcomponent from './footcomponent';
import Headcomponent from './headcomponent';
import SecondBodyComponent from './secondbodycomponent'
class App extends React.Component{

  constructor() {
    super();
    this.tableObjectid = 1;
    this.excludedObjectid=1
    this.state = {
      tabledata: [
      {
        id:1,
        Naam: "",
        rs_amount: "",
        dollar_amount: ""
        }],
      excludeddata: [
        {
          id:1,
          excluded_name:""
        }
      ],
      total_rs_amount: 0,
      total_dollar_amount:0
    }
    this.handleChange = this.handleChange.bind(this)
  this.buttonclick=this.buttonclick.bind(this)

  }


  dateContainer =()=> {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime
  }

  deletelastcharacter(index, name,copytabledata,objectname) {
    //TO DELETE LAST CHARACTER IN INPUT BOX 
    const currentobject = copytabledata[index]
    Object.keys(currentobject).forEach(key => {
      if (name === key) {
        currentobject[key] = "";
      }
    })
    if (objectname === "tabledata") {
      this.setState({
        tabledata: copytabledata
      })
    }
    else if (objectname==="excludeddata") {
      this.setState({
        excludeddata: copytabledata
      })
    }
    
  }
  update_id(copydata,index) {
    copydata.forEach(element => {
      Object.keys(element).forEach(item => {
        if (item === "id") {  
          if (element[item] > index + 1) {
            element[item]=element[item]-1;
          }
        }
      })
    })
}
  checkrowdeletion(index,copydata,objectname) {
    let count = (copydata.length)-1;
      if (count>0) {
        
        let currentobject = copydata[index]
        if (objectname === "tabledata")
        {
          let empty=3
          Object.keys(currentobject).forEach(key => {
            if (
              (key === "Naam" && currentobject[key] === "")) {
              empty--
            } 
            if(
              (key === "rs_amount" && currentobject[key] === "")) {
              empty--
            }
            if (key === "dollar_amount" && currentobject[key] === "") {
                  empty--
                }
          })
          if (empty ===0) {
            console.log("this is empty row", empty)
            
            //updating id value
            this.update_id(copydata,index)
            copydata.splice(index, 1)
            this.setState({
              tabledata:copydata
          })
          }
        }
        else if (objectname === "excludeddata") {
          let empty=1
          Object.keys(currentobject).forEach(key => { 
            if ((key === "excluded_name")) {
              empty--
            }
          })
          if (empty ===0) {
            console.log("this is empty row", empty)
             //updating id value
            copydata.splice(index,1)
            this.setState({
              excludeddata:copydata
            })
            console.log(this.state.excludeddata)
          }
        }
      }
  }
  checkrowaddition(index,copydata,previousid,objectname) {
    let count = copydata.length
      let current_row=parseInt(index)+1
    if (count === current_row) {
      if (objectname === "tabledata") {
        console.log(previousid)
        copydata.push({
          id:previousid+1,
          Naam: "",
          rs_amount: "",
          dollar_amount: ""
        })
        this.setState({
          tabledata: copydata
        })
        this.tableObjectid=this.tableObjectid+1
      }
      else if (objectname === "excludeddata") {
        console.log(previousid)
        copydata.push({
          id:previousid+1,
          excluded_name:""
        })
        this.setState({
          excludeddata: copydata
        })
        this.excludedObjectid=this.excludedObjectid+1
      }
    }
  }
  handleChange(index,event) {
    const { name, value } = event.target;
    if (value === "") {
      //Below function call will erase if any value is present by updating state of this row element as null
      const copytabledata = [...this.state.tabledata];
      this.deletelastcharacter(index,name,copytabledata,"tabledata");
      // UPDATING TOTAL RS AMOUNT AND TOTAL DOLLAR AMOUNT
      // previous_rs or previous_dollar will be initially zero but during next iteration it will hold previous rupees value 
      let rupees = 0, dollar = 0, previous_rs = 0, current_rs = 0, previous_dollar = 0, current_dollar = 0;
      const secondcopy = [...this.state.tabledata]
      secondcopy.forEach(item => {
        Object.keys(item).forEach(key => {
          if (key === "rs_amount") {
            //make it zero if NAN
            previous_rs = (isNaN(parseInt(rupees)) ? 0 : parseInt(rupees))
            current_rs = (isNaN(parseInt(item[key])) ? 0 : parseInt(item[key]))
            rupees = previous_rs + current_rs
          }
          if (key === "dollar_amount") {
            //make it zero if NAN
            previous_dollar = (isNaN(parseInt(dollar)) ? 0 : parseInt(dollar))
            current_dollar = (isNaN(parseInt(item[key])) ? 0 : parseInt(item[key]))
            dollar = previous_dollar + current_dollar
          }
        })
      })
      this.setState({
        total_rs_amount: rupees,
        total_dollar_amount: dollar
      })
      //DELETING ROWS - if more than one row exist and is completely empty than the empty row wil be deleted
      this.checkrowdeletion(index,copytabledata,"tabledata")
    }
    else {
      //UPDATING table ROW DATA INTO STATE -  NOTE : THIS WILL CHECK TO UPDATE ONLY IN PARTICULAR ROW
      const copytabledata = [...this.state.tabledata];
      const currentobject = copytabledata[index]
      Object.keys(currentobject).forEach(key => {
        if (name === key) {
          currentobject[key] = value;
        }
        if (key === "id")
        {
          //updates object id to initialize value of id in new object
          this.tableObjectid=currentobject[key]
        }
      })
      this.setState({
        tabledata: copytabledata
      })

      //Checking to Add new rows
      this.checkrowaddition(index,copytabledata,this.tableObjectid,"tabledata")
      
      
      // UPDATING TOTAL RS AMOUNT AND TOTAL DOLLAR AMOUNT - NOTE: THIS WILL LOOP THROUGH ALL ROWS AND SUM UP AMOUNT
      // previous_rs or previous_dollar will be initially zero but during next iteration it will hold previous rupees value 
      let rupees = 0, dollar = 0, previous_rs = 0, current_rs = 0, previous_dollar = 0, current_dollar = 0;
      var secondcopy = [...this.state.tabledata]
      secondcopy.forEach(item => {
        Object.keys(item).forEach(key => {
          if (key === "rs_amount") {
            //make it zero is NAN
            previous_rs = (isNaN(parseInt(rupees)) ? 0 : parseInt(rupees))
            current_rs = (isNaN(parseInt(item[key])) ? 0 : parseInt(item[key]))
            rupees = previous_rs + current_rs
          }
          if (key === "dollar_amount") {
            previous_dollar = (isNaN(parseInt(dollar)) ? 0 : parseInt(dollar))
            current_dollar = (isNaN(parseInt(item[key])) ? 0 : parseInt(item[key]))
            dollar = previous_dollar + current_dollar
          }
        })
      })
      this.setState({
        total_rs_amount: rupees,
        total_dollar_amount: dollar
      })
    }
  }
  




  secondchange(index,event) {
    const { name, value } = event.target;
    if (value === "") {
      //Below function call will erase if any value is present by updating state of this row element as null
      const copytabledata = [...this.state.excludeddata];
      this.deletelastcharacter(index, name,copytabledata,"excludeddata");
      //DELETING ROWS - if more than one row exist and is completely empty than the empty row wil be deleted
     this.checkrowdeletion(index,copytabledata,"excludeddata")
    }
    else {
      //UPDATING table ROW DATA INTO STATE -  NOTE : THIS WILL CHECK TO UPDATE ONLY IN PARTICULAR ROW
      const copytabledata = [...this.state.excludeddata];
      const currentobject = copytabledata[index]
      Object.keys(currentobject).forEach(key => {
        if (name === key) {
          currentobject[key] = value;
        }
        if (key === "id")
        {
          //updates excludedobject id to initialize value of id in new object
          this.excludedObjectid=currentobject[key]
        }
      })
      this.setState({
        excludeddata: copytabledata
      })

      // //Checking to Add new rows
      this.checkrowaddition(index,copytabledata,this.excludedObjectid,"excludeddata")
      
    }
  }


  buttonclick() {
  console.log(this.state)
}


  render() {
    return (
      <div className="App">
        <div>
          <p> <strong>Included</strong>
          <span style={{ float: "right" }}><strong>{this.dateContainer()}</strong></span></p>
        </div>
        <div>
          <table>
            <thead>
              <Headcomponent/>
            </thead>
            <tbody>
              {this.state.tabledata.map((data, index) => {
                return <BodyComponent
                  key={data.id}
                  id={data.id}
                  data={data}
                  handleChange={this.handleChange.bind(this, index)}
                />
              })}
            </tbody>
            <tfoot>
              <Footcomponent trs={this.state.total_rs_amount} tds={this.state.total_dollar_amount}/>
            </tfoot>
          </table>  
          {console.log(this.state)}
        </div>
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <p> <strong>Excluded</strong></p>
          <table>
            <thead>
              <tr>
                <th align="left">Name</th>
              </tr>
            </thead>
            <tbody>
            {this.state.excludeddata.map((data, index) => {
              return <SecondBodyComponent
                  key={data.id}
                  id={data.id}
                  data={data}
                  secondhandleChange={this.secondchange.bind(this, index)}
                />
              })}
            </tbody>
          </table>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <button onClick={this.buttonclick}>Press here</button>
        </div>
      </div>
    )
} 
}
export default App;
