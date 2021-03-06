import React from 'react';
// import {connect} from 'react-redux'
import LoginForm from '../components/LoginForm'
import BarnContainer from './BarnContainer'
import {withRouter} from 'react-router-dom'

class Login extends React.Component{


  handleClick = (e)=>{
      this.props.history.push('/signup')
  }

  render(){
    return(
      <div className="login-flow">
        <LoginForm />
        <button onClick={this.handleClick}>Sign Up!</button>
        <BarnContainer />
      </div>
    )
  }
}


export default withRouter(Login)
