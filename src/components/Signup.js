import React from 'react';
import {connect} from 'react-redux'
import {createUser, fetchBarns} from '../actions/actions'
import BarnCreationForm from './BarnCreationForm'


class Signup extends React.Component{
  state={
    user: {email: "",
      password:"",
      password_confirmation: "",
      name:"",
      phone_number:"",
      mailing_address:"",
      emergency_contact:"",
      is_manager: false,
      is_employee: false
    },
    new_barn: false,
    selected_barn: 0
  }

  componentDidMount(){
    this.props.fetchBarns()
  }

  handleChange = (e)=>{
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSelectChange = (e)=>{
    let ind = e.target.options.selectedIndex
    this.setState({
      selected_barn: e.target.options[ind].value
    })
  }

  handleCheckChange = (e)=>{
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    })
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    if (this.state.password === this.state.password_confirmation){
      this.props.createUser({...this.state.user, barn_id: this.state.selected_barn})
    }else{
      alert("Whoa, there! Your passwords must match!")
    }
  }

  render(){
    console.log(this.state)
    const barns = this.props.barns.map((barn)=>{
      return (
        <option value={barn.id}> {barn.name} </option>
      )
    })
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name="email" placeholder="email" onChange={this.handleChange} value={this.state.email}/><br/>
          <input type="password" placeholder="password" name="password" onChange={this.handleChange} value={this.state.password}/><br/>
          <input type="password" placeholder="password confirmation" name="password_confirmation" onChange={this.handleChange} value={this.state.password_confirmation}/><br/>
          <input name="name" placeholder="name" onChange={this.handleChange} value={this.state.name}/><br/>
          <input name="phone_number" placeholder="phone_number" onChange={this.handleChange} value={this.state.phone_number}/><br/>
          <input name="mailing_address" placeholder="mailing_address" onChange={this.handleChange} value={this.state.mailing_address}/><br/>
          <input name="emergency_contact" placeholder="emergency_contact" onChange={this.handleChange} value={this.state.emergency_contact}/><br/>
          <input type="checkbox" name="is_manager" placeholder="Manager?" onChange={this.handleCheckChange} value={this.state.is_manager}/> Manager?<br/>
          <input type="checkbox" name="is_employee" placeholder="Employee?" onChange={this.handleCheckChange} value={this.state.is_employee}/> Employee?<br/>
          { !this.state.new_barn ? <select name="selected_barn" placeholder="choose a barn" onChange={this.handleSelectChange} value={this.state.selected_barn}>
            <option value="">Choose here</option>
            {barns}
          </select> : null}
          <input type="checkbox" name="new_barn" placeholder="New Barn?" onChange={this.handleCheckChange} value={this.state.new_barn}/> New Barn?<br/>
          <input type="submit"/>
        </form>
        {this.state.new_barn ? <BarnCreationForm/> : null}
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    barns: state.barns
  }
}


export default connect(mapStateToProps, {createUser, fetchBarns})(Signup)
