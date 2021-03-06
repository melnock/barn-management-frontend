import React from 'react';
import {connect} from 'react-redux'
import {createMeal} from '../actions/actions'
import MealCard from './MealCard'
import MealForm from './MealForm'

class MealList extends React.Component{

  state={
    viewable: false,
    addMeal: false,
  }

  viewMeal = (e)=>{
    e.preventDefault()
    this.setState({
      viewable: !this.state.viewable
    })
  }



  handleClick = (e)=>{
    e.preventDefault()
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    })
  }

  render(){
    console.log("meals", this.props)
    const mealmeals = this.props.meals.filter((s)=> s.horse_id === this.props.selectedHorse.id)
    const horseMeals = mealmeals.map((s, ind)=> <MealCard key={ind} meal={s} viewMeal={this.viewMeal} viewable={this.state.viewable}/>)
    return(
       <div className="meal-list" >
        {horseMeals}
        <div className="meal-button">
          <button onClick={this.handleClick} name="addMeal"> {this.state.addMeal ? "Close Meal Form" : "Add a New Meal"} </button>
        </div>
       {this.state.addMeal ? <MealForm horseMeals={mealmeals}/> : null}
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


export default connect(mapStateToProps, {createMeal})(MealList)
