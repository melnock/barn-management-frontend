import React from 'react';
import {connect} from 'react-redux'
import UserList from '../components/UserList'
import {updateUser} from '../actions/actions'

class ManagerDashboard extends React.Component{

  handleAccordion = (e)=>{
    e.target.classList.toggle("active")
    var panel = e.target.nextElementSibling;
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }
  }


  render(){
    const users = this.props.users.map((user)=>{
      return <UserList user={user} key={user.id}/>
    })
    const tack = this.props.horses.map((horse)=>{
      return(
        <tr value={horse.id} key={horse.id}>
          <td> {horse.name} </td>
          <td> {horse.tack.saddle}</td>
          <td> {horse.tack.bridle}</td>
          <td> {horse.tack.saddle_pads}</td>
          <td> {horse.tack.special_equipment}</td>
        </tr>
      )
    })

    const tableTack= <table>
    <thead>
      <tr>
        <th> Horse Name </th>
        <th> Saddle </th>
        <th> Bridle </th>
        <th> Saddle Pads </th>
        <th> Special Equipment </th>
      </tr>
    </thead>
    <tbody>
      {tack}
    </tbody>
    </table>

    const blankets = this.props.horses.map((horse)=>{
      return(
        <tr value={horse.id} key={horse.id}>
          <td> {horse.name} </td>
          <td> {horse.blankets.below_60.type} | {horse.blankets.below_60.color}</td>
          <td> {horse.blankets.below_40.type} | {horse.blankets.below_40.color}</td>
          <td> {horse.blankets.below_30.type} | {horse.blankets.below_30.color}</td>
          <td> {horse.blankets.below_20.type} | {horse.blankets.below_20.color}</td>
        </tr>
      )
    })

    const tableBlankets= <table>
    <thead>
      <tr>
        <th> Horse Name </th>
        <th> Below 60 </th>
        <th> Below 40 </th>
        <th> Below 30 </th>
        <th> Below 20 </th>
      </tr>
    </thead>
    <tbody>
      {blankets}
    </tbody>
    </table>

    return(
      <div className="dashboard">
        <div className="accordion" onClick={this.handleAccordion}>
          Boarders/Employees
          <span className="plus-accordion">+</span>
        </div>
        <div className="panel">
          {this.props.currentUser.is_manager ? <div className="user-list"> {users} </div>: null}
        </div>
        <div className="accordion" onClick={this.handleAccordion}>
          Tack
          <span className="plus-accordion">+</span>
        </div>
        <div className="panel" >
          {this.props.currentUser.is_employee ? <div className="tack-list"> {tableTack} </div> :null}
        </div>
        <div className="accordion" onClick={this.handleAccordion}>
          Blankets
          <span className="plus-accordion">+</span>
        </div>
        <div className="panel" >
          {this.props.currentUser.is_employee ? <div className="blanket-list"> {tableBlankets} </div> :null}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    users: state.users,
    horses: state.horses,
    currentUser: state.currentUser
  }
}
export default connect(mapStateToProps, {updateUser})(ManagerDashboard)
