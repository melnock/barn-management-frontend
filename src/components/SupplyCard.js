import React from 'react';
import {connect} from 'react-redux'
import {} from '../actions/actions'
import {withRouter} from 'react-router-dom'

class SupplyCard extends React.Component{

  render(){
    return(
      <div className="supply">
        <p>{this.props.supply.name}</p>
        <p>{this.props.supply.type_of_supply}</p>
        <p>{"$" + this.props.supply.cost}</p>
        {this.props.viewable ? <div><p>{this.props.supply.vendor}</p><p>{this.props.supply.weight}lbs</p> </div>: null }
        <button onClick={this.props.viewSupply}>{this.props.viewable ? "Collapse" : "Expand"}</button>
      </div>

    )
  }
}

function mapStateToProps(state){
  return{
    supplies: state.supplies
  }
}


export default withRouter(connect(mapStateToProps, {})(SupplyCard))
