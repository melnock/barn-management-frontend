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
    selected_barn: 0
  }

  componentDidMount(){
    this.props.fetchBarns()
  }

  handleChange = (e)=>{
    this.setState({
      selected_barn: this.props.selectedBarn,
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
      new_barn: !this.state.new_barn,
      selected_barn: 0,
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
      this.props.createUser({...this.state.user, barn_id: this.state.selected_barn})
      .then(this.props.history.push('/home'))
    }else{
      alert("Whoa, there! Your passwords must match!")
    }
  }

  handleClick=()=>{
    this.props.history.push('/login')
  }

  render(){
    console.log(this.props)
    const barns = this.props.barns.map((barn)=>{
      return (
        <option value={barn.id}> {barn.name} </option>
      )
    })
    return(
      <div className="user-form">
        <div className="barn-choice">
          { !this.state.new_barn ? <select name="selected_barn" placeholder="choose a barn" onChange={this.handleSelectChange} value={this.state.selected_barn}>
          <option value="">Choose here</option>
          {barns}
          </select> : <BarnCreationForm/>}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="checkbox" name="new_barn" placeholder="New Barn?" onChange={this.handleCheckChange} value={this.state.new_barn}/> New Barn?<br/>
          <input name="email" placeholder="email" onChange={this.handleChange} value={this.state.email}/><br/>
          <input type="password" placeholder="password" name="password" onChange={this.handleChange} value={this.state.password}/><br/>
          <input type="password" placeholder="password confirmation" name="password_confirmation" onChange={this.handleChange} value={this.state.password_confirmation}/><br/>
          <input name="name" placeholder="name" onChange={this.handleChange} value={this.state.name}/><br/>
          <input name="phone_number" placeholder="phone_number" onChange={this.handleChange} value={this.state.phone_number}/><br/>
          <input name="mailing_address" placeholder="mailing_address" onChange={this.handleChange} value={this.state.mailing_address}/><br/>
          <input name="emergency_contact" placeholder="emergency_contact" onChange={this.handleChange} value={this.state.emergency_contact}/><br/>
          <input type="submit"/>
        </form>
        <button onClick={this.handleClick}> Already a user? </button>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    barns: state.barns,
    selectedBarn: state.selectedBarn
  }
}


export default withRouter(connect(mapStateToProps, {createUser, fetchBarns})(Signup))
