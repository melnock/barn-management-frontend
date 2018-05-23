import React from 'react';
import {connect} from 'react-redux'
import HorseCard from '../components/HorseCard'
import HorseShowPage from '../components/HorseShowPage'
import ManagerDashboard from './ManagerDashboard'


class UserHorsesList extends React.Component{

  state={
    new_horse: false
  }

  handleClick = (e)=>{
    this.props.history.push('/newhorse')
  }

  render(){
    let horses = this.props.horses.length ? this.props.horses.map((horse, ind)=>{
      return(
          <HorseCard horse={horse} key={ind}/>
      )
    }) : "There are no Horses in Your Barn!"

    return(
      <div>
        {this.props.current_barn ? <div><h1> Welcome to {this.props.current_barn.name}</h1><ManagerDashboard/></div> : "No Barn???"}
        <div className="horse-list">
          {this.props.selectedHorse ? <HorseShowPage/> :

            horses

          }
        </div>

      </div>
    )
  }
}

function mapStateToProps(state){
  console.log(state)
  return {
    currentUser: state.currentUser,
    horses: state.horses,
    selectedHorse: state.selectedHorse,
    current_barn: state.current_barn
  }
}

export default connect(mapStateToProps)(UserHorsesList)
