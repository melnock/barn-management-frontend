import React from 'react';
import {connect} from 'react-redux'
import {selectedHorse} from '../actions/actions'
import {withRouter} from 'react-router-dom'

class HorseCard extends React.Component{

  handleClick=()=>{
    this.props.selectedHorse(this.props.horse)
    this.props.history.push('/horses'+ `/${this.props.horse.id}`)
  }

  render(){
    return(
      <div className="horse-card" onClick={this.handleClick}>
        <h1> {this.props.horse.name}</h1>
        <img alt="horse" src={this.props.horse.image}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    horses: state.horses
  }
}


export default withRouter(connect(mapStateToProps, {selectedHorse})(HorseCard))
