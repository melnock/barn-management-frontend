import React from 'react';
import {connect} from 'react-redux'
import UserList from '../components/UserList'
import {updateUser} from '../actions/actions'

class ManagerDashboard extends React.Component{

  componentDidMount(){
    this.props.updateUser()
  }

  render(){
    const users = this.props.users.map((user)=>{
      return <UserList user={user} key={user.id}/>
    })
    return(
      <div>
        {users}
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    users: state.users,
  }
}
export default connect(mapStateToProps, {updateUser})(ManagerDashboard)
