import React from 'react';
import {connect} from 'react-redux'
import {updateUser, selectedHorse} from '../actions/actions'
import {withRouter} from 'react-router-dom'


class UserManagerList extends React.Component{

  state={
    manager: this.props.user.is_manager,
    employee: this.props.user.is_employee
  }

  handleClick=(e)=>{
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    })
  }

  render(){
    const userHorses = this.props.horses.filter((horse)=>{
      return this.props.user.id === horse.user_id
    })

    const ponyPics = userHorses.map((horse)=>{
      return (
        <a key={horse.id} onClick={(e)=>{
          e.preventDefault()
          this.props.selectedHorse(horse)
          this.props.history.push(`/horses/${horse.id}`)
        }}><img className="mini-icon" alt="mini-horse" src={horse.image}/>
        </a>
      )
    })
    const employeeOwner =  this.props.user.is_employee ?
          <div><p>Employee</p>
          <button name="promote" onClick={this.handleClick}>
            Promote
          </button>
          </div>
          :
          <div><p>Owner</p>
          <button name="employ" onClick={this.handleClick}>
            Employ
            </button>
          </div>
    return(
      <div className="user-card">
        <p> {this.props.user.name} </p>
        {this.props.user.is_manager ? <div>
            <p>Manager | Employee</p>
            <button name="demote" onClick={this.handleDemotion}>
              Demote
              </button>
            </div>
         :
          employeeOwner
          }

        <p> {this.props.user.phone_number}</p>
        <p> Emergency Contact: {this.props.user.emergency_contact}</p>
        {ponyPics}
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    users: state.users,
    horses: state.horses
  }
}


export default withRouter(connect(mapStateToProps, {updateUser, selectedHorse})(UserManagerList))
