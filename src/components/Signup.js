import React from 'react';
import {connect} from 'react-redux'
import {createUser, fetchBarns} from '../actions/actions'
import BarnCreationForm from './BarnCreationForm'
import {withRouter} from 'react-router-dom'


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
    barn_id: ""
  }

  componentDidMount(){
    this.props.fetchBarns()
  }

  handleChange = (e)=>{
    this.setState({
      barn_id: this.props.selectedBarn,
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSelectChange = (e)=>{
    let ind = e.target.options.selectedIndex
    console.log(ind)
    console.log(e.target.value)
    this.setState({
      barn_id: e.target.value
    })
  }

  handleCheckChange = (e)=>{
    this.setState({
      new_barn: !this.state.new_barn,
      barn_id: 0,
      user:{
        ...this.state.user,
        is_manager: !this.state.is_manager,
        is_employee: !this.state.is_manager
      }
    })
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    if (this.state.password === this.state.password_confirmation){
      this.props.createUser({...this.state.user, barn_id: this.state.barn_id})
      .then(()=>{if (!this.props.errors) {this.props.history.push('/home')}})
    }else{
      alert("Whoa, there! Something doesn't line up!")
    }
  }

  handleClick=()=>{
    this.props.history.push('/login')
  }

  render(){
    console.log(this.state)
    const barns = this.props.barns.map((barn)=>{
      return (
        <option value={barn.id} key={barn.id}> {barn.name} </option>
      )
    })
    return(
      <div className="user-form">
        <div className="barn-choice">
          { !this.state.new_barn ? <select name="barn_id" placeholder="choose a barn" onChange={this.handleSelectChange} value={this.state.barn_id}>
          <option value="">Choose here</option>
          {barns}
          </select> : <BarnCreationForm/>}
        </div>

        {this.props.errors.length ? this.props.errors.map((er)=> <p className="error">{er}</p>):null}

        <form id="new-user" onSubmit={this.handleSubmit}>
          <div className="barn-info">
            <input type="checkbox" name="new_barn" placeholder="New Barn?" onChange={this.handleCheckChange} value={this.state.new_barn}/> New Barn?<br/>
          </div>
          <div className="user-info">
            <div className="form-label">E-mail:</div><input name="email" placeholder="email" onChange={this.handleChange} value={this.state.email}/><br/>
            <div className="form-label">Password:</div><input type="password" placeholder="password" name="password" onChange={this.handleChange} value={this.state.password}/><br/>
            <div className="form-label">Password Confirmation:</div><input type="password" placeholder="password confirmation" name="password_confirmation" onChange={this.handleChange} value={this.state.password_confirmation}/><br/>
            <div className="form-label">Name:</div><input name="name" placeholder="name" onChange={this.handleChange} value={this.state.name}/><br/>
            <div className="form-label">Phone Number:</div><input name="phone_number" placeholder="phone_number" onChange={this.handleChange} value={this.state.phone_number}/><br/>
            <div className="form-label">Mailing Address:</div><input name="mailing_address" placeholder="mailing_address" onChange={this.handleChange} value={this.state.mailing_address}/><br/>
            <div className="form-label">Emergency Contact:</div><input name="emergency_contact" placeholder="emergency_contact" onChange={this.handleChange} value={this.state.emergency_contact}/><br/>
          </div>
          <input type="submit"/>
        </form>
        <button id="already-user" onClick={this.handleClick}> Already a user? </button>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    barns: state.barns,
    selectedBarn: state.selectedBarn,
    errors: state.errors
  }
}


export default withRouter(connect(mapStateToProps, {createUser, fetchBarns})(Signup))
