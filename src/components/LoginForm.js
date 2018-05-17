import React from 'react';
import {connect} from 'react-redux'
import {login} from '../actions/actions'
import Signup from './Signup'

class LoginForm extends React.Component{
  state={
    email: "",
    password:"",
    signup: false
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    this.props.login(this.state.email, this.state.password)
  }

  handleClick = (e)=>{
    this.setState({
      signup:true
    })
  }

  render(){
    return(
      <div>
        {!this.state.signup ? <form onSubmit={this.handleSubmit}>
          <input name="email" placeholder="email" onChange={this.handleChange} value={this.state.email}/>
          <input type="password" placeholder="password" name="password" onChange={this.handleChange} value={this.state.password}/>
          <input type="submit"/>
        </form> : <Signup/>}
        <button onClick={this.handleClick}> Sign Up! </button>
      </div>
    )
  }
}


export default connect(null, {login})(LoginForm)
