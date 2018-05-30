import React from 'react';
import {connect} from 'react-redux'
import UserManagerList from '../components/UserManagerList'
import UserList from '../components/UserList'
import {updateUser} from '../actions/actions'
import SupplyList from '../components/SupplyList'

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
    const usersManager = this.props.users.map((user)=>{
      return <UserManagerList user={user} key={user.id}/>
    })

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

    const meals = this.props.horses.map((horse)=>{
      const horseMeals = this.props.meals.filter((meal) => {
        return meal.horse_id === horse.id
      })
      const supplyQuantityMeasurement = (time)=>{
        const meal = horseMeals.find((meal) => meal.time === time)
        if (meal) {
          const supply = this.props.supplies.find((s)=> s.id === meal.supply_id)
          const quantity = meal.quantity
          const measurement = meal.measurement
          const supplements = meal.supplements ? " | " + "Supplements:" + horse.supplements.map((s)=>("| "+ s)) : ""
          console.log(supplements)
          return supply.name + " | " + supply.brand + " | " + quantity + " " + measurement +  supplements
        }
        else{
          return "none"
        }
      }
      return(
        <tr value={horse.id} key={horse.id}>
          <td> {horse.name} </td>
          <td> {supplyQuantityMeasurement("am")} </td>
          <td> {supplyQuantityMeasurement("am-hay")} </td>
          <td> {supplyQuantityMeasurement("lunch")} </td>
          <td> {supplyQuantityMeasurement("lunch-hay")} </td>
          <td> {supplyQuantityMeasurement("pm")} </td>
          <td> {supplyQuantityMeasurement("pm-hay")} </td>
          <td> {supplyQuantityMeasurement("night-check")} </td>
        </tr>

      )
    })

    const tableMeals= <table>
    <thead>
      <tr>
        <th> Horse Name </th>
        <th> Grain AM </th>
        <th> Hay AM</th>
        <th> Grain Lunch </th>
        <th> Hay Lunch </th>
        <th> Grain PM </th>
        <th> Hay PM</th>
        <th> Night Check </th>
      </tr>
    </thead>
    <tbody>
      {meals}
    </tbody>
    </table>

    let fullStalls = 0
    const mapStalls = this.props.stalls.map((stall)=>{
      const horse = this.props.horses.find((h)=> h.stall_id === stall.id)
      fullStalls = horse ? ++fullStalls : fullStalls
      return(
        <div className={horse ? "stall-card-full" : "stall-card"} value={stall.id} key={stall.id}>
          <p> {stall.stall_number}</p>
          <p> {horse ? horse.name : "empty"} </p>
        </div>
      )
    })


    return(
      <div className="dashboard">
        <div className="accordion" onClick={this.handleAccordion}>
          Boarders/Employees
          <span className="plus-accordion">&#9816;</span>
        </div>
        <div className="panel">
          {this.props.currentUser.is_manager ? <div className="user-list"> {usersManager} </div>: <div className="user-list">{users}</div>}
        </div>
        <div className="accordion" onClick={this.handleAccordion}>
          Barn Images
          <span className="plus-accordion">&#9816;</span>
        </div>
        <div className="panel">
          <div className="barn-images">
            <img className="barn-img" alt="barn" src={this.props.current_barn.images.main}/>
            <img className="barn-img" alt="barn" src={this.props.current_barn.images.indoor_arena}/>
            <img className="barn-img" alt="barn" src={this.props.current_barn.images.outdoor_arena}/>
            <img className="barn-img" alt="barn" src={this.props.current_barn.images.paddocks}/>
          </div>
        </div>
        {this.props.currentUser.is_employee ? <div>
        <div className="accordion" onClick={this.handleAccordion}>
          Tack
          <span className="plus-accordion">&#9816;</span>
        </div>
        <div className="panel" >
          <div className="tack-list"> {tableTack} </div>
        </div>
        <div className="accordion" onClick={this.handleAccordion}>
          Blankets
          <span className="plus-accordion">&#9816;</span>
        </div>
        <div className="panel" >
          <div className="blanket-list"> {tableBlankets} </div>
        </div>
        <div className="accordion" onClick={this.handleAccordion}>
          Meals
          <span className="plus-accordion">&#9816;</span>
        </div>
        <div className="panel" >
          <div className="meal-chart"> {tableMeals} </div>
        </div>
        <div className="accordion" onClick={this.handleAccordion}>
          Stalls
          <span className="plus-accordion">&#9816;</span>
        </div>
        <div className="panel" >
          <div className="stall-list"><p className="stall-count"> Number of Empty Stalls: {this.props.current_barn.number_of_stalls - fullStalls}</p> {mapStalls} </div>
        </div>
        <div className="accordion" onClick={this.handleAccordion}>
          Supplies
          <span className="plus-accordion">&#9816;</span>
        </div>
        <div className="panel" >
          <div className="supply-list"><SupplyList/></div>
        </div></div> :null}

      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    users: state.users,
    horses: state.horses,
    currentUser: state.currentUser,
    stalls: state.stalls,
    paddocks: state.paddocks,
    current_barn: state.current_barn,
    meals: state.meals,
    supplies: state.supplies
  }
}
export default connect(mapStateToProps, {updateUser})(ManagerDashboard)
