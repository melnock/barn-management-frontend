import React from 'react';
import {connect} from 'react-redux'
import {mealDelete} from '../actions/actions'
import {withRouter} from 'react-router-dom'
import MealEditForm from './MealEditForm'


class MealCard extends React.Component{

  state={
    editable: false
  }

  editMeal = (e)=>{
    e.preventDefault()
    this.setState({
      editable: !this.state.editable
    })
  }

  handleDelete = (e)=>{
    this.props.mealDelete(this.props.meal)
  }

  render(){
    const supply = this.props.supplies.find((s)=> s.id === this.props.meal.supply_id)
    return(
      <div>
        {!this.state.editable ? <div className="meal-card"><span id="meal-delete" onClick={this.handleDelete}>x</span>
          <p>{supply.name}</p>
          <p>{this.props.meal.time}</p>
          {this.props.viewable ? <div><p>{this.props.meal.quantity} {this.props.meal.measurement}</p> </div>: null }
          <button onClick={this.props.viewMeal}>{this.props.viewable ? "Collapse" : "Expand"}</button>
          <button onClick={this.editMeal}>Edit</button>
        </div>
        :
        <div className="meal-card-edit">
          <MealEditForm meal={this.props.meal} editable={this.editMeal}/>
        </div>
      }
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


export default withRouter(connect(mapStateToProps, {mealDelete})(MealCard))
