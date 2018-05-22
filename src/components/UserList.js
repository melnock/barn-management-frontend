import React from 'react';
import {connect} from 'react-redux'
import {updateUser} from '../actions/actions'

class UserList extends React.Component{

  state={
    manager: this.props.user.is_manager,
    employee: this.props.user.is_employee
  }

  handleClick=(e)=>{
    this.setState({
      [e.target.name]: !this.state.[e.target.name]
    })
  }

  render(){
    return(
      <div className="user-card" onClick={this.handleClick}>
        <h1> {this.props.user.name}</h1>
        <p> {this.props.user.is_manager ? <div>
            "Manager | Employee"
            <button name="demotion" onClick={this.handleDemotion}>
              Demotion
              </button>
            </div>
         :
          {this.props.user.is_employee ?
            <div>"Employee"
            <button name="manager" onClick={this.handleClick}>
              Make Manager
            </button>
            </div>
            :
            <div>"Owner"
            <button name="employee" onClick={this.handleClick}>
              Make Employee
              </button>
            </div>}
          }
        </p>
        <p> {this.props.user.phone_number}</p>
        <p> {this.props.user.emergency_contact}</p>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    users: state.users
  }
}


export default connect(mapStateToProps, {updateUser})(UserList)
