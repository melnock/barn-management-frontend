import React from 'react';
import {connect} from 'react-redux'
import HorseCard from '../components/HorseCard'
import HorseShowPage from '../components/HorseShowPage'


class UserHorsesList extends React.Component{
  render(){
    console.log("list-page", this.props)

    const horses = this.props.horses.map((horse, ind)=>{
      return(
          <HorseCard horse={horse} key={ind}/>
      )
    })

    return(
      <div className="horse-list">
        {this.props.selectedHorse ? <HorseShowPage history={this.props.history}/> : horses}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    horses: state.horses,
    selectedHorse: state.selectedHorse
  }
}

export default connect(mapStateToProps)(UserHorsesList)
