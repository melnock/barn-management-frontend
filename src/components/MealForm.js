import React from 'react';
import {connect} from 'react-redux'
import {createMeal} from '../actions/actions'

class MealForm extends React.Component{

  state={

      supply_id: 0,
      quantity: 0,
      measurement:"",
      supplements: false

  }

  handleChange = (e)=>{
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleCheckChange = (e)=>{
    console.log("woo")
    this.setState({
        [e.target.name]: !this.state[e.target.name]
    })
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    this.props.createMeal({ ...this.state, horse_id: this.props.selectedHorse.id })
    this.setState({
      supply_id: 0,
      quantity: 0,
      measurement:"",
      supplements: false
    })
  }

  render(){
    const horseYums = this.props.horseMeals.map((m)=> m.time)
    console.log("meals", this.props.horseMeals[0])
    const mealTimesBase = ["am", "am-hay", "lunch", "lunch-hay", "pm", "pm-hay", "night check"]
    const mealTimes = mealTimesBase.filter(mt => !horseYums.includes(mt) )
    const mealTimesObj = mealTimes.map((t)=> <option value={t}> {t} </option>)
    const suppliesFood = this.props.supplies.filter(s => s.type_of_supply === "hay" || s.type_of_supply === "grain")
    const supplies = suppliesFood.map((s)=> <option value={s.id}>{s.name} | {s.brand}</option>)
    return(

     <div className="new-meal">
         <form className="meal-form" onSubmit={this.handleSubmit}>
           <select name="time"onChange={this.handleChange} value={this.state.time}>
              <option value=""> Choose a time for Meal </option>
              {mealTimesObj}
           </select>
           <select name="supply_id"onChange={this.handleChange} value={this.state.supply_id}>
              <option value=""> Choose a type of Meal </option>
              {supplies}
           </select>
           <input type="number" onChange={this.handleChange} value={this.state.quantity} name="quantity" placeholder="amount"/>
           <input onChange={this.handleChange} value={this.state.measurement} name="measurement" placeholder="Measuring Tool/Weight"/>
           <div className="form-sublabel">Add Supplements? <input type="checkbox" onChange={this.handleCheckChange} value={this.state.supplements} name="supplements" placeholder="Supplements?"/>
           </div>
           <input type="submit"/>
         </form>
       </div>
    )
  }
}

function mapStateToProps(state){
  console.log("MSP", state.meals);
  return{
    meals: state.meals,
    supplies: state.supplies,
    selectedHorse: state.selectedHorse
  }
}


export default connect(mapStateToProps, {createMeal})(MealForm)
