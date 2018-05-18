import React from 'react';
import {connect} from 'react-redux'
import {createBarn} from '../actions/actions'

class Signup extends React.Component{
  state={
    barn: {amenities: [],
    board_cost:"",
    name:"",
    phone_number:"",
    address:"",
    number_of_paddocks:"",
    number_of_stalls: "",
    images: {
      main:"",
      outdoor_arena:"",
      indoor_arena:"",
      paddocks: ""
    }},
    amenity:""
  }

  handleChange = (e)=>{
    this.setState({
      barn: {
        ...this.state.barn,
        [e.target.name]: e.target.value
      }
    })
  }

  handleCheckBoxChange = (e)=>{

      this.setState({
        barn: {
          ...this.state.barn,
          [e.target.name]: !this.state.barn[e.target.name]
        }
      })

  }

  handleSubmit = (e)=>{
    e.preventDefault()
    console.log(this.state.barn)
    this.props.createBarn({...this.state.barn})
  }

  handleImageChange = (e)=>{
    this.setState({
      barn:{...this.state.barn,
        images:{
        ...this.state.barn.images,
        [e.target.name]: e.target.value
      }}
    })
  }

  handleAmenityChange=(e)=>{
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleAmenitiesChange = (e)=>{
    console.log(e.key)
    this.setState({
      barn: {
        ...this.state.barn,
        amenities:[
          ...this.state.barn.amenities,
          e.target.value
        ]
      }
    })
  }

  removeAmenity = (e)=>{
    e.preventDefault()
    this.setState({
      barn: {
        ...this.state.barn,
      amenities: [...this.state.barn.amenities.slice(0, e.target.value),...this.state.barn.amenities.slice(e.target.value+1, this.state.barn.amenities.length) ]
      }
    })
  }

  addAmenity = (e)=>{
    e.preventDefault()
    this.setState({
      barn: {
        ...this.state.barn,
      amenities: [...this.state.barn.amenities, this.state.amenity]
      },
      amenity: ""
    })
  }

  render(){
    const amenities = this.state.barn.amenities.map((am, ind) => {return <li key={ind} value={ind}> {am} <button onClick={this.removeAmenity}> x </button></li>})
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name="name" placeholder="name" onChange={this.handleChange} value={this.state.barn.name}/><br/>
          Amenities:
          <ul>
          {amenities}
          </ul>
          <input name="amenity" placeholder="amenities" onChange={this.handleAmenityChange} value={this.state.amenity}/><button onClick={this.addAmenity}> + </button><br/>
          <input name="board_cost" placeholder="board_cost" onChange={this.handleChange} value={this.state.barn.board_cost}/><br/>
          <input name="address" placeholder="address" onChange={this.handleChange} value={this.state.barn.address}/><br/>
          <input name="number_of_paddocks" placeholder="number of paddocks" onChange={this.handleChange} value={this.state.barn.number_of_paddocks}/><br/>
          <input name="number_of_stalls" placeholder="number of stalls" onChange={this.handleChange} value={this.state.barn.number_of_stalls}/><br/>
          Images:<br/>
          Main<input name="main" placeholder="image url" onChange={this.handleImageChange} value={this.state.barn.images.main}/><br/>
          Indoor<input name="indoor_arena" placeholder="image url" onChange={this.handleImageChange} value={this.state.barn.images.indoor_arena}/><br/>
          Outdoor<input name="outdoor_arena" placeholder="image url" onChange={this.handleImageChange} value={this.state.barn.images.outdoor_arena}/><br/>
          Paddocks<input name="paddocks" placeholder="image url" onChange={this.handleImageChange} value={this.state.barn.images.paddocks}/><br/>

          <input type="submit"/>
        </form>
      </div>
    )
  }
}


export default connect(null, {createBarn})(Signup)
