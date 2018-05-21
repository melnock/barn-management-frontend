import React from 'react';
import {connect} from 'react-redux'
import HorseCard from '../components/HorseCard'
import HorseShowPage from '../components/HorseShowPage'
import HorseCreationForm from '../components/HorseCreationForm'


class UserHorsesList extends React.Component{

  state={
    new_horse: false
  }

  handleClick = (e)=>{
    this.setState({
      new_horse: !this.state.new_horse
    })
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
        {this.props.selectedHorse ? <HorseShowPage history={this.props.history}/> :
        <div> {horses}
        {this.state.new_horse ? <HorseCreationForm /> : <button onClick={this.handleClick}> Add A Horse </button>}
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
