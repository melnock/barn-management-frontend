import React from 'react';
// import {connect} from 'react-redux'
import LoginForm from '../components/LoginForm'
import BarnContainer from './BarnContainer'
class Login extends React.Component{
  

  render(){
    return(
      <div>
        <LoginForm />
        <BarnContainer />
      </div>
    )
  }
}


export default Login
