import React from 'react';
import {connect} from 'react-redux'
import {createFarrier} from '../actions/actions'

class FarrierCreationForm extends React.Component{
  state={
    practice_name:"",
    name:"",
    phone_number:"",
    pager_number:"",
    address: "",
    email: "",
  }

  handleChange = (e)=>{
    this.setState({
        [e.target.name]: e.target.value
    })
  }


  handleSubmit = (e)=>{
    e.preventDefault()
    console.log(this.state)
    this.props.createFarrier({...this.state})
    .then(()=>this.props.stateFix("farrier"))
  }

  render(){
    console.log("state", this.state);
    console.log("props", this.props);

    return(
      <div className="farrier-form">
        <form onSubmit={this.handleSubmit}>
          <input name="name" placeholder="name" onChange={this.handleChange} value={this.state.name}/><br/>
          <input name="practice_name" placeholder="practice_names" onChange={this.handleChange} value={this.state.practice_name}/>
          <input name="address" placeholder="address" onChange={this.handleChange} value={this.state.address}/><br/>
          <input name="phone_number" placeholder="phone_number" onChange={this.handleChange} value={this.state.phone_number}/><br/>
          <input name="pager_number" placeholder="pager number" onChange={this.handleChange} value={this.state.pager_number}/><br/>
          <input name="email" placeholder="email" onChange={this.handleChange} value={this.state.email}/><br/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    vets: state.vets,
    farriers: state.farriers,
    paddocks: state.paddocks,
    stalls: state.stalls,
    currentUser: state.currentUser,
    current_barn: state.current_barn
  }
}


export default connect(mapStateToProps, {createFarrier})(FarrierCreationForm)
