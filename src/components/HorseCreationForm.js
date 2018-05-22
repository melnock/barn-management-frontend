import React from 'react';
import {connect} from 'react-redux'
import {createHorse, editHorse} from '../actions/actions'
import VetCreationForm from './VetCreationForm'
import FarrierCreationForm from './FarrierCreationForm'
import {withRouter} from 'react-router-dom'


class HorseCreationForm extends React.Component{
  state={
    horse: {supplements: [],
    birth_year:"",
    name:"",
    image:"",
    paddock_id:"",
    stall_id: "",
    vet_id: 1,
    farrier_id:1,
    gender:"",
    tack: {
      saddle:"",
      bridle: "",
      saddle_pads:"",
      special_equipment:""
    },
    blankets: {
      below_60:{type: "", color: ""},
      below_40:{type: "", color: ""},
      below_30:{type: "", color: ""},
      below_20:{type: "", color: ""}
    }},
    supplement:"",
    new_vet: false,
    new_farrier: false,
    edit: false
  }

  componentDidMount(){
    if (this.props.selectedHorse) {
      this.editHorse()
    }
  }

  handleChange = (e)=>{
    this.setState({
      horse: {
        ...this.state.horse,
        [e.target.name]: e.target.value
      }
    })
  }

  handleNewVetFarrier = (vetOrFarrier) =>{
    const key = "new_" + vetOrFarrier
    this.setState({
      [key]: false,
    })
  }

  handleCheckBoxChange = (e)=>{

      this.setState({
        horse: {
          ...this.state.horse,
          [e.target.name]: !this.state.horse[e.target.name]
        }
      })

  }

  handleCheckChange = (e)=>{
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    })
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    if (this.state.edit){
      this.props.editHorse({...this.state.horse, barn_id: this.props.current_barn.id})
      .then(this.props.history.push('/home'))
    }
    else{
      this.props.createHorse({...this.state.horse, barn_id: this.props.current_barn.id, user_id: this.props.currentUser.id})
      .then(this.props.history.push('/home'))
    }
  }

  handleBlanketChange = (e)=>{
    this.setState({
      horse:{...this.state.horse,
        blankets:{
        ...this.state.horse.blankets,
        [e.target.name]:{
          ...this.state.horse.blankets[e.target.name],
          color: e.target.value
        }
      }}
    })
  }

  handleTackChange = (e)=>{
    this.setState({
      horse:{...this.state.horse,
        tack:{
        ...this.state.horse.tack,
        [e.target.name]: e.target.value
      }}
    })
  }

  handleBlanketSelect = (e)=>{
    this.setState({
      horse:{...this.state.horse,
        blankets:{
        ...this.state.horse.blankets,
        [e.target.name]:{
          ...this.state.horse.blankets[e.target.name],
          type: e.target.value
        }
      }}
    })
  }

  handleSupplementChange=(e)=>{
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleSupplementsChange = (e)=>{
    this.setState({
      horse: {
        ...this.state.horse,
        supplements:[
          ...this.state.horse.supplements,
          e.target.value
        ]
      }
    })
  }

  removeSupplement = (e)=>{
    e.preventDefault()
    this.setState({
      horse: {
        ...this.state.horse,
      supplements: [...this.state.horse.supplements.slice(0, e.target.value),...this.state.horse.supplements.slice(e.target.value+1, this.state.horse.supplements.length) ]
      }
    })
  }

  addSupplement = (e)=>{
    e.preventDefault()
    this.setState({
      horse: {
        ...this.state.horse,
        supplements: [...this.state.horse.supplements, this.state.supplement]
      },
      supplement: ""
    })
  }

  editHorse = ()=>{
    this.setState({
      horse: {...this.props.selectedHorse},
      edit: true
    })
  }

  render(){
    console.log("state", this.state);
    console.log("props", this.props);
    const supplements = this.state.horse.supplements.map((am, ind) => {return <li key={ind} value={ind}> {am} <button onClick={this.removeSupplement} className="plus-button" value={ind}>x</button></li>})
    const blanketSelect = ["below_60", "below_40", "below_30", "below_20"].map(num => {
      return(
        <select onChange={this.handleBlanketSelect} name={num} value={this.state.horse.blankets[num].type} key={num}>
          <option value="">Select Blanket Weight</option>
          <option value="Sheet">Sheet</option>
          <option value="Medium">Medium</option>
          <option value="Medium Heavy">Medium Heavy</option>
          <option value="Heavy">Heavy</option>
        </select>
      )
    })
    const vets = this.props.vets.map((vet)=>{
      return (
        <option value={vet.id} key={vet.id}> {vet.name} | {vet.practice_name}</option>
      )
    })
    const farriers = this.props.farriers.map((farrier)=>{
      return (
        <option value={farrier.id} key={farrier.id}> {farrier.name} | {farrier.practice_name}</option>
      )
    })

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="basic-info">
            <input name="name" placeholder="name" onChange={this.handleChange} value={this.state.horse.name}/><br/>
            <input name="birth_year" placeholder="birth_year" onChange={this.handleChange} value={this.state.horse.birth_year}/><br/>
            <input name="image" placeholder="image" onChange={this.handleChange} value={this.state.horse.image}/><br/>
            <select onChange={this.handleChange} name="gender" value={this.state.horse.gender}>
              <option value="">Select Gender</option>
              <option value="Mare">Mare</option>
              <option value="Gelding">Gelding</option>
              <option value="Stallion">Stallion</option>
            </select>
          </div>
          <div className="supplements">
            Supplements:
            <ul>
            {supplements}
            </ul>
            <input className="shorter-input" name="supplement" placeholder="supplements" onChange={this.handleSupplementChange} value={this.state.supplement}/><button className="plus-button" onClick={this.addSupplement}>+</button><br/>
          </div>
          <div className="barn-info">
            <input name="paddock_id" placeholder="paddock number" onChange={this.handleChange} value={this.state.horse.paddock_id}/><br/>
            <input name="stall_id" placeholder="stall number" onChange={this.handleChange} value={this.state.horse.stall_id}/><br/>
          </div>
          <div className="blankets">
            Blankets:<br/>
              Below 60 <input name="below_60" placeholder="blanket description" onChange={this.handleBlanketChange} value={this.state.horse.blankets.below_60.color}/><br/>
              {blanketSelect[0]}
              <br/>
              Below 40<input name="below_40" placeholder="blanket description" onChange={this.handleBlanketChange} value={this.state.horse.blankets.below_40.color}/><br/>
              {blanketSelect[1]}
              <br/>
              Below 30<input name="below_30" placeholder="blanket description" onChange={this.handleBlanketChange} value={this.state.horse.blankets.below_30.color}/><br/>
              {blanketSelect[2]}
              <br/>
              Below 20<input name="below_20" placeholder="blanket description" onChange={this.handleBlanketChange} value={this.state.horse.blankets.below_20.color}/><br/>
              {blanketSelect[3]}
              <br/>
          </div>
          <div className="tack">
            Tack:<br/>
              <input name="saddle" placeholder="saddle" onChange={this.handleTackChange} value={this.state.horse.tack.saddle}/><br/>
              <input name="bridle" placeholder="bridle" onChange={this.handleTackChange} value={this.state.horse.tack.bridle}/><br/>
              <input name="saddle_pads" placeholder="saddle pads" onChange={this.handleTackChange} value={this.state.horse.tack.saddle_pads}/><br/>
              <input name="special_equipment" placeholder="special equipment" onChange={this.handleTackChange} value={this.state.horse.tack.special_equipment}/><br/>
          </div>

          <input type="submit"/>
        </form>

          <div className="vet-info">
            Vet: <br/>
            {this.state.new_vet ? <VetCreationForm stateFix= {this.handleNewVetFarrier}/> : <select name="vet" onChange={this.handleChange} value={this.state.horse.vet}>
            {vets}
            </select>}<br/>
            <input type="checkbox" name="new_vet" placeholder="New Vet?" onChange={this.handleCheckChange} value={this.state.new_barn}/> New Vet?<br/>
          </div>

          <div className="farrier-info">
            Farrier: <br/>
            {this.state.new_farrier ? <FarrierCreationForm stateFix= {this.handleNewVetFarrier}/> : <select name="farrier" onChange={this.handleChange} value={this.state.horse.farrier}>
            {farriers}
            </select>}<br/>
            <input type="checkbox" name="new_farrier" placeholder="New Farrier?" onChange={this.handleCheckChange} value={this.state.new_barn}/> New Farrier?<br/>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    vets: state.vets,
    farriers: state.farriers,
    paddocks: state.paddocks,
    stalls: state.stalls,
    currentUser: state.currentUser,
    current_barn: state.current_barn,
    selectedHorse: state.selectedHorse
  }
}


export default withRouter(connect(mapStateToProps, {createHorse, editHorse})(HorseCreationForm))
