import React from 'react';
import {connect} from 'react-redux'
import {createUser} from '../actions/actions'
import BarnCreationForm from './BarnCreationForm'


class Signup extends React.Component{
  state={
    email: "",
    password:"",
    passwordConfirmation: "",
    name:"",
    phone_number:"",
    mailing_address:"",
    emergency_contact:"",
    is_manager: false,
    is_employee: false,
    new_barn: false
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheckChange = (e)=>{
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    })
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    this.props.createUser({...this.state})
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name="email" placeholder="email" onChange={this.handleChange} value={this.state.email}/>
          <input type="password" placeholder="password" name="password" onChange={this.handleChange} value={this.state.password}/>
          <input type="passwordConfirmation" placeholder="passwordConfirmation" name="passwordConfirmation" onChange={this.handleChange} value={this.state.passwordConfirmation}/>
          <input name="name" placeholder="name" onChange={this.handleChange} value={this.state.name}/>
          <input name="phone_number" placeholder="phone_number" onChange={this.handleChange} value={this.state.phone_number}/>
          <input name="mailing_address" placeholder="mailing_address" onChange={this.handleChange} value={this.state.mailing_address}/>
          <input name="emergency_contact" placeholder="emergency_contact" onChange={this.handleChange} value={this.state.emergency_contact}/>
          <input type="checkbox" name="is_manager" placeholder="Manager?" onChange={this.handleCheckChange} value={this.state.is_manager}/>
          <input type="checkbox" name="is_employee" placeholder="Employee?" onChange={this.handleCheckChange} value={this.state.is_employee}/>
          <input type="checkbox" name="new_barn" placeholder="New Barn?" onChange={this.handleCheckChange} value={this.state.new_barn}/>

          {this.state.new_barn ? <BarnCreationForm /> : }

          <input type="submit"/>
        </form>
      </div>
    )
  }
}


export default connect(null, {createUser})(Signup)
