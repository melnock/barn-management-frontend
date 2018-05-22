import React from 'react';
import {connect} from 'react-redux'
import {login} from '../actions/actions'
import {withRouter} from 'react-router-dom'

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
    .then(()=> this.props.history.push('/home'))
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


export default withRouter(connect(null, {login})(LoginForm))
