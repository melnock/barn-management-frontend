import React from 'react';
import {connect} from 'react-redux'
import {selectedBarn} from '../actions/actions'

class BarnCard extends React.Component{

  handleClick=()=>{
    this.props.selectedBarn(this.props.barn)
  }

  render(){
    return(
      <div className="barn-card" onClick={this.handleClick}>
        <h1> {this.props.barn.name}</h1>
        <img alt="barn" src={this.props.barn.images.main}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    barns: state.barns
  }
}


export default connect(mapStateToProps, {selectedBarn})(BarnCard)
