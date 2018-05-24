import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux'
import UserHorsesList from './containers/UserHorsesList'
import Login from './containers/Login'
import NavBar from './containers/NavBar'
import Signup from './components/Signup'
import HorseShowPage from './components/HorseShowPage'
import HorseCreationForm from './components/HorseCreationForm'
import {Route, withRouter} from 'react-router-dom'
import {getUser, logout} from './actions/actions'

class App extends Component {

  componentDidMount(){
    console.log("heelllllooo")
		if (localStorage.getItem("token")){
			this.props.getUser()
			.then(() => {
				this.props.history.push('/home')
			})
		}else{
      this.props.history.push('/login')
    }
	}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stable Talk</h1>
          {this.props.currentUser ? <NavBar/> : null}
        </header>
				<Route path="/home" component={UserHorsesList}/>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup}/>
        <Route path="/newhorse" component={HorseCreationForm}/>
        <Route path="/horses/:id" component={HorseShowPage}/>
			</div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    horses: state.horses,
    vets: state.vets,
    farriers: state.farriers
  }
}

export default withRouter(connect(mapStateToProps, {getUser, logout})(App));
