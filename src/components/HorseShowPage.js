import React from 'react';
import {connect} from 'react-redux'
import {selectedHorse, getUser} from '../actions/actions'
import ReportCard from './ReportCard'
import HorseCreationForm from './HorseCreationForm'
import {withRouter} from 'react-router-dom'
import HorseManagerChart from './HorseManagerChart'
import MealList from './MealList'

class HorseShowPage extends React.Component{
  state={
    show: true,
    edit: false
  }


    handleAccordion = (e)=>{
      e.target.classList.toggle("active")
      var panel = e.target.nextElementSibling;
      if (panel.style.display === "block") {
          panel.style.display = "none";
      } else {
          panel.style.display = "block";
      }
    }


  handleReportSubmit = ()=>{
    this.setState({
      show: true
    })
  }

  editHorse=()=>{
    this.setState({
      edit: !this.state.edit
    })
  }

  render(){
    console.log("show-page", this.props)

    if (this.props.selectedHorse){
    return(
      <div className="horse-card-show" >
      {this.state.show ? <div className="horse-card-show" >
        {this.props.currentUser && (this.props.currentUser.id === this.props.selectedHorse.user_id || this.props.currentUser.is_manager) ?
          <div className="dashboard">
            <div className="accordion" onClick={this.handleAccordion}>
              Health Reports
              <span className="plus-accordion">+</span>
            </div>
            <div className="panel">
              <HorseManagerChart />
            </div>
            <div className="accordion" onClick={this.handleAccordion}>
              Meals
              <span className="plus-accordion">+</span>
            </div>
            <div className="panel">
              <MealList />
            </div>
          </div>
          :
          null
        }
        <h1> {this.props.selectedHorse.name}</h1>
        <img className="horse-show-image" alt="selectedHorse" src={this.props.selectedHorse.image}/>
        <h3> Stall: {this.props.selectedHorse.stall_id}</h3>
        <h3> Paddock: {this.props.selectedHorse.paddock_id}</h3>
        <div className="tack-list">
          <h3> Tack: </h3>
          <p>Saddle:  {this.props.selectedHorse.tack.saddle}</p>
          <p>Bridle:  {this.props.selectedHorse.tack.bridle}</p>
          <p>Saddle Pads:  {this.props.selectedHorse.tack.saddle_pads}</p>
          <p>Special Equipment:  {this.props.selectedHorse.tack.special_equipment}</p>
        </div>
        <button onClick={()=>{this.props.select(null)
          this.props.history.push('/home')}}> Go Back </button>
        {this.props.currentUser.id === this.props.selectedHorse.user_id || this.props.currentUser.is_employee ? <button onClick={()=>{this.setState({show:false})}}> Add Report Card </button> : null}
        {this.props.currentUser.id === this.props.selectedHorse.user_id || this.props.currentUser.is_manager ? <button onClick={this.editHorse}> Edit Horse Info </button> : null}
      </div> : <ReportCard handleReportSubmit={this.handleReportSubmit}/>}
      {this.state.edit ? <HorseCreationForm /> : null}
      </div>
    )
  } else {
    return <h1>LOADING</h1>
  }
  }
}

function mapStateToProps(state){
  return{
    selectedHorse: state.selectedHorse,
    currentUser: state.currentUser
  }
}


export default withRouter(connect(mapStateToProps, {select: selectedHorse, getUser: getUser})(HorseShowPage))
