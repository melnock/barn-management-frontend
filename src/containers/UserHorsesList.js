import React from 'react';
import {connect} from 'react-redux'
import HorseCard from '../components/HorseCard'
import HorseShowPage from '../components/HorseShowPage'
import HorseCreationForm from '../components/HorseCreationForm'
import {withRouter} from 'react-router-dom'


class UserHorsesList extends React.Component{

  state={
    new_horse: false
  }

  handleClick = (e)=>{
    this.props.history.push('/horses/new')
  }

  render(){
    let horses

    {this.props.horses.length ? horses = this.props.horses.map((horse, ind)=>{
      return(
          <HorseCard horse={horse} key={ind}/>
      )
    }) : horses = "There are no Horses in Your Barn!"}

    return(
      <div>
        {this.props.current_barn ? <h1> Welcome to {this.props.current_barn.name}</h1> : "No Barn???"}
      <div className="horse-list">
        {this.props.selectedHorse ? <HorseShowPage/> :
        <div> {horses}
        <button onClick={this.handleClick}> Add A Horse </button>
        </div>

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
