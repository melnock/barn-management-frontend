import React from 'react';
import {connect} from 'react-redux'
import {login} from '../actions/actions'

class LoginForm extends React.Component{
  state={
    email: "",
    password:""
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

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name="email" placeholder="email" onChange={this.handleChange} value={this.state.email}/>
          <input type="password" placeholder="password" name="password" onChange={this.handleChange} value={this.state.password}/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}


export default connect(null, {login})(LoginForm)
