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
    user_id:0,
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
      this.props.createHorse({...this.state.horse, barn_id: this.props.current_barn.id})
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
    if (this.props.currentUser){
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

      const mapStalls = this.props.stalls.map((stall)=>{
        const horse = this.props.horses.find((h)=> h.stall_id === stall.id)
        if (horse) {
          return ""
        }else{
          return(
            <option value={stall.id} key={stall.id}> {stall.stall_number}</option>
          )
        }
      }).filter((s) => s!=="")

      const mapPaddocks = this.props.paddocks.map((paddock)=>{
        const horse = this.props.horses.filter((h)=> h.paddock_id === paddock.id)
        if (horse.length >= paddock.capacity) {
          return ""
        }else{
          return(
            <option value={paddock.id} key={paddock.id}> {paddock.paddock_number | paddock.capacity}</option>
          )
        }
      }).filter((p) => p!=="")

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

      const users = this.props.users.map((user)=>{
        return (
          <option value={user.id} key={user.id}> {user.name} </option>
        )
      })

      return(
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="basic-info">
              <div className="form-label">Horse Name: </div><input name="name" placeholder="name" onChange={this.handleChange} value={this.state.horse.name}/><br/>
              <div className="form-label">Birth Year: </div><input name="birth_year" placeholder="birth_year" onChange={this.handleChange} value={this.state.horse.birth_year}/><br/>
              <div className="form-label">Picture URL: </div><input name="image" placeholder="image url" onChange={this.handleChange} value={this.state.horse.image}/><br/>
              <div className="form-label">Gender: </div><select onChange={this.handleChange} name="gender" value={this.state.horse.gender}>
                <option value="">Select Gender</option>
                <option value="Mare">Mare</option>
                <option value="Gelding">Gelding</option>
                <option value="Stallion">Stallion</option>
              </select><br/>
              <div className="form-label">Horse Owner:</div>
              <select name="user_id" onChange={this.handleChange} value={this.state.horse.user_id}>
                <option value="">Select Owner</option>
                {users}
              </select><br/>
            </div>
            <div className="supplements">
              <div className="form-label">Supplements:</div>
              <ul className="array">
              {supplements}
              </ul>
              <input className="shorter-input" name="supplement" placeholder="supplements" onChange={this.handleSupplementChange} value={this.state.supplement}/><button className="plus-button" onClick={this.addSupplement}>+</button><br/>
            </div>
            <div className="barn-info">
              <div className="form-label">Paddock: </div><select name="paddock_id" placeholder="paddock number" onChange={this.handleChange} value={this.state.horse.paddock_id}>
                <option value="">Select Paddock</option>
                {mapPaddocks}
              </select><br/>


              <div className="form-label">Stall:</div> <select name="stall_id" placeholder="stall number" onChange={this.handleChange} value={this.state.horse.stall_id}>
                <option value="">Select Stall</option>
                {mapStalls}
              </select>

            </div>
            <div className="blankets">
              <div className="form-label">Blankets: </div><br/>
              <div className="blanket">
                <span className="form-sublabel">Below 60 </span><input name="below_60" placeholder="blanket description" onChange={this.handleBlanketChange} value={this.state.horse.blankets.below_60.color}/><br/>
                {blanketSelect[0]}
              </div>
              <div className="blanket">
                <span className="form-sublabel">Below 40</span><input name="below_40" placeholder="blanket description" onChange={this.handleBlanketChange} value={this.state.horse.blankets.below_40.color}/><br/>
                {blanketSelect[1]}
              </div>
              <div className="blanket">
                <span className="form-sublabel">Below 30</span><input name="below_30" placeholder="blanket description" onChange={this.handleBlanketChange} value={this.state.horse.blankets.below_30.color}/><br/>
                {blanketSelect[2]}
              </div>
              <div className="blanket">
                <span className="form-sublabel">Below 20</span><input name="below_20" placeholder="blanket description" onChange={this.handleBlanketChange} value={this.state.horse.blankets.below_20.color}/><br/>
                {blanketSelect[3]}
              </div>
            </div>
            <div className="tack">
              <div className="form-label">Tack: </div><br/>
                <input name="saddle" placeholder="saddle" onChange={this.handleTackChange} value={this.state.horse.tack.saddle}/><br/>
                <input name="bridle" placeholder="bridle" onChange={this.handleTackChange} value={this.state.horse.tack.bridle}/><br/>
                <input name="saddle_pads" placeholder="saddle pads" onChange={this.handleTackChange} value={this.state.horse.tack.saddle_pads}/><br/>
                <input name="special_equipment" placeholder="special equipment" onChange={this.handleTackChange} value={this.state.horse.tack.special_equipment}/><br/>
            </div>

            <input type="submit"/>
          </form>

            <div className="vet-info">
              <div className="form-label">Vet: </div>
              {this.state.new_vet ? <VetCreationForm stateFix= {this.handleNewVetFarrier}/> : <select name="vet" onChange={this.handleChange} value={this.state.horse.vet}>
              {vets}
              </select>}<br/>
              <input type="checkbox" name="new_vet" placeholder="New Vet?" onChange={this.handleCheckChange} value={this.state.new_barn}/> New Vet?<br/>
            </div>

            <div className="farrier-info">
              <div className="form-label">Farrier: </div>
              {this.state.new_farrier ? <FarrierCreationForm stateFix= {this.handleNewVetFarrier}/> : <select name="farrier" onChange={this.handleChange} value={this.state.horse.farrier}>
              {farriers}
              </select>}<br/>
              <input type="checkbox" name="new_farrier" placeholder="New Farrier?" onChange={this.handleCheckChange} value={this.state.new_barn}/> New Farrier?<br/>
            </div>
        </div>
      )
    } else {
      return <h1>LOADING</h1>
    }
  }
}

function mapStateToProps(state){
  return{
    vets: state.vets,
    farriers: state.farriers,
    paddocks: state.paddocks,
    stalls: state.stalls,
    horses: state.horses,
    currentUser: state.currentUser,
    users: state.users,
    current_barn: state.current_barn,
    selectedHorse: state.selectedHorse
  }
}


export default withRouter(connect(mapStateToProps, {createHorse, editHorse})(HorseCreationForm))
