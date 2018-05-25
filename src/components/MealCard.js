import React from 'react';
import {connect} from 'react-redux'
import {} from '../actions/actions'
import {withRouter} from 'react-router-dom'

class MealCard extends React.Component{

  render(){
    const supply = this.props.supplies.find((s)=> s.id === this.props.meal.supply_id)
    return(
      <div className="meal-card">
        <p>{supply.name}</p>
        <p>{this.props.meal.time}</p>
        {this.props.viewable ? <div><p>{this.props.meal.quantity} {this.props.meal.measurement}</p> </div>: null }
        <button onClick={this.props.viewMeal}>{this.props.viewable ? "Collapse" : "Expand"}</button>
      </div>

    )
  }
}

function mapStateToProps(state){
  return{
    selectedHorse: state.selectedHorse,
    supplies: state.supplies
  }
}


export default withRouter(connect(mapStateToProps, {})(MealCard))
