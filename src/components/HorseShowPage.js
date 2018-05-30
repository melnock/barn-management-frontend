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
    edit: false,
    expandFarr: false,
    expandVet:false
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

  handleClick=(e)=>{
    console.log(e.target)
    if (e.target.name === "farrier") {
      this.setState({
        expandFarr: !this.state.expandFarr
      })
    }else if (e.target.name === "vet"){
        this.setState({
          expandVet: !this.state.expandVet
        })
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
    console.log("show-page", this.state)
    if (this.props.selectedHorse){
      const farr = this.props.farriers.find((f) => f.id === this.props.selectedHorse.farrier_id)
      const vet = this.props.vets.find((f) => f.id === this.props.selectedHorse.vet_id)
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
        <h1> {this.props.selectedHorse.name}</h1><br/>
        <img className="horse-show-image" alt="selectedHorse" src={this.props.selectedHorse.image}/>
        <div className="horse-info">
          <h3> Stall: {this.props.selectedHorse.stall_id}</h3>
          <h3> Paddock: {this.props.selectedHorse.paddock_id}</h3>
          <h3> Foal Date: {this.props.selectedHorse.birth_year}</h3>
          <h3> Gender: {this.props.selectedHorse.gender}</h3>
          <div className="accordion horse-show-accordion" onClick={this.handleAccordion}>
            Farrier: {farr.name}
            <span className="plus-accordion">+</span>
          </div>
          <div className="panel horse-show-panel">
            <p> {farr.phone_number}</p>
            <p> {farr.pager_number}</p>
            <p> {farr.practice_name}</p>
            <p> {farr.address}</p>
            <p> {farr.email}</p>
          </div>
          <div className="accordion horse-show-accordion" onClick={this.handleAccordion}>
            Vet: {vet.name}
            <span className="plus-accordion">+</span>
          </div>
          <div className="panel horse-show-panel">
            <p> {vet.phone_number}</p>
            <p> {vet.pager_number}</p>
            <p> {vet.practice_name}</p>
            <p> {vet.address}</p>
            <p> {vet.email}</p>
          </div>
          <button onClick={()=>{this.props.select(null)
            this.props.history.push('/home')}}> Go Back </button><br/>
          {this.props.currentUser.id === this.props.selectedHorse.user_id || this.props.currentUser.is_employee ? <button onClick={()=>{this.setState({show:false})}}> Add Report Card </button> : null}<br/>
          {this.props.currentUser.id === this.props.selectedHorse.user_id || this.props.currentUser.is_manager ? <button onClick={this.editHorse}> Edit Horse Info </button> : null}<br/>
        </div></div> : <ReportCard handleReportSubmit={this.handleReportSubmit}/>}
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
    currentUser: state.currentUser,
    farriers: state.farriers,
    vets: state.vets
  }
}


export default withRouter(connect(mapStateToProps, {select: selectedHorse, getUser: getUser})(HorseShowPage))
