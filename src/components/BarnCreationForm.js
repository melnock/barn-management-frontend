import React from 'react';
import {connect} from 'react-redux'
import {createBarn} from '../actions/actions'

class Signup extends React.Component{
  state={
    email: "",
    password:"",
    passwordConfirmation: "",
    name:"",
    phone_number:"",
    address:"",
    number_of_paddocks:"",
    number_of_stalls: false,
    images: false,
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
    this.props.createBarn(this.state.email, this.state.password)
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
        <input name="name" placeholder="name" onChange={this.handleChange} value={this.state.name}/>
          <input name="amenities" placeholder="amenities" onChange={this.handleChange} value={this.state.amenities}/>
          <input name="board_cost" placeholder="board_cost" onChange={this.handleChange} value={this.state.board_cost}/>
          <input name="address" placeholder="address" onChange={this.handleChange} value={this.state.address}/>
          <input name="number_of_paddocks" placeholder="number of paddocks" onChange={this.handleChange} value={this.state.number_of_paddocks}/>
          <input name="number_of_stalls" placeholder="number of stalls" onChange={this.handleCheckChange} value={this.state.number_of_stalls}/>
          <input name="images" placeholder="image url" onChange={this.handleCheckChange} value={this.state.images}/>
          <input type="checkbox" name="new_barn" placeholder="New Barn?" onChange={this.handleCheckChange} value={this.state.new_barn}/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}


export default connect(null, {createBarn})(Signup)
