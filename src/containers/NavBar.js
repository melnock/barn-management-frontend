import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter, Link} from 'react-router-dom'
import {logout} from '../actions/actions'

class NavBar extends Component {


  render(){
    return(
      <div className="nav">
      <Link to="/home"> Home </Link>
      <Link to="/newhorse"> Add a Horse </Link>
      <button onClick={() => {
        this.props.logout()
        this.props.history.push('/login')
      }}>Logout</button>
      </div>
    )
  }

}


export default withRouter(connect(null, {logout})(NavBar))
