import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter, Link} from 'react-router-dom'
import {logout} from '../actions/actions'

class NavBar extends Component {


  render(){
    return(
      <div className="nav">
      <Link to="/home"> &#9816; Home </Link>
      <Link to="/newhorse"> &#9816; Add a Horse </Link>
      <button onClick={() => {
        this.props.logout()
        this.props.history.push('/login')
      }}>&#9816; Logout</button>
      </div>
    )
  }

}


export default withRouter(connect(null, {logout})(NavBar))
