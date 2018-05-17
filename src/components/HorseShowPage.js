import React from 'react';
import {connect} from 'react-redux'
import {selectedHorse} from '../actions/actions'
import ReportCard from './ReportCard'
class HorseShowPage extends React.Component{
  state={
    show: true
  }

  handleReportSubmit = ()=>{
    this.setState({
      show: true
    })
  }

  render(){
    console.log("show-page", this.props)
    return(
      <div className="horse-card-show" >
      {this.state.show ? <div className="horse-card-show" >
        <h1> {this.props.selectedHorse.name}</h1>
        <img alt="selectedHorse" src={this.props.selectedHorse.image}/>
        <h3> Stall: {this.props.selectedHorse.stall_id}</h3>
        <h3> Paddock: {this.props.selectedHorse.paddock_id}</h3>
        <div className="tack-list">
          <h3> Tack: </h3>
          <p>Saddle:  {this.props.selectedHorse.tack.saddle}</p>
          <p>Bridle:  {this.props.selectedHorse.tack.bridle}</p>
          <p>Saddle Pads:  {this.props.selectedHorse.tack.saddle_pads}</p>
          <p>Special Pads:  {this.props.selectedHorse.tack.special_pads}</p>
        </div>
        <button onClick={()=>{this.props.select(null)}}> Go Back </button>
        {this.props.currentUser.id === this.props.selectedHorse.user_id || this.props.currentUser.is_employee ? <button onClick={()=>{this.setState({show:false})}}> Add Report Card </button> : null}
        {this.props.currentUser.id === this.props.selectedHorse.user_id || this.props.currentUser.is_manager ? <button > Edit Horse Info </button> : null}
      </div> : <ReportCard handleReportSubmit={this.handleReportSubmit}/>}
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    selectedHorse: state.selectedHorse,
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps, {select: selectedHorse})(HorseShowPage)
