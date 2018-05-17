import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux'
import UserHorsesList from './containers/UserHorsesList'
import Login from './containers/Login'
import {Route, withRouter} from 'react-router-dom'
import {getUser, logout} from './actions/actions'

class App extends Component {

  componentDidMount(){
    console.log(localStorage.getItem("token"))
		if (localStorage.getItem("token")){
			this.props.getUser()
			.then(() => {
				this.props.history.push('/home')
			})
		}
	}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stable Talk</h1>
        </header>
				<button onClick={() => {
					this.props.logout()
					this.props.history.push('/login')
				}}>Logout</button>
				{this.props.currentUser ? <Route path="/home" component={UserHorsesList}/> : 				<Route path="/login" component={Login} />}
			</div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, {getUser, logout})(App));
