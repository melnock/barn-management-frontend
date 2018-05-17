import React from 'react';
import {connect} from 'react-redux'
import {submitReportCard} from '../actions/actions'

class ReportCard extends React.Component{

  state={
    hay: 5,
    grain:5,
    water: 5,
    manure:5,
    comments:""
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    const healthreport = {...this.state, horse_id: this.props.selectedHorse.id, user_id: this.props.currentUser.id}
    console.log(healthreport)
    this.props.submitReportCard({ healthreport })
    this.props.handleReportSubmit()
  }

  render(){
    console.log("show-page", this.state)
    return(
       <div className="horse-card-report" >
       <h1> {this.props.selectedHorse.name} Report Card</h1>

       <form className="horse-card-report" onSubmit={this.handleSubmit}>
         <input type="range" min="1" max="10" onChange={this.handleChange} value={this.state.hay} className="slider" id="haySlider" name="hay"/><div className="label">Hay</div>
         <input type="range" min="1" max="10" onChange={this.handleChange} value={this.state.grain} className="slider" id="grainSlider" name="grain"/><div className="label">Grain</div>
         <input type="range" min="1" max="10" onChange={this.handleChange} value={this.state.water} className="slider" id="waterSlider" name="water"/><div className="label">Water</div>
         <input type="range" min="1" max="10" onChange={this.handleChange} value={this.state.manure} className="slider" id="manureSlider" name="manure"/><div className="label">Manure</div>
         <br/>
         <input type="textarea" name="comments" placeholder="comments" onChange={this.handleChange} value={this.state.comments}/>
         <br/>
         <input type="submit"/>
       </form>
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


export default connect(mapStateToProps, {submitReportCard: submitReportCard})(ReportCard)
