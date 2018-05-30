import React from 'react';
import {connect} from 'react-redux'
import {createBarn} from '../actions/actions'

class BarnCreationForm extends React.Component{
  state={
    barn: {amenities: [],
    board_cost:"",
    name:"",
    phone_number:"",
    address:{
      street_address: "",
      city:"",
      state:"",
      zip:""
    },
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

  handleAddressChange = (e)=>{
    this.setState({
      barn:{...this.state.barn,
        address:{
        ...this.state.barn.adress,
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
    const amenities = this.state.barn.amenities.map((am, ind) => {return <li key={ind} value={ind}> {am} <button className="plus-button" onClick={this.removeAmenity}>x</button></li>})
    return(
      <div className="barn-form">
        <form onSubmit={this.handleSubmit}>
          <div className="barn-info">
            <div className="form-label">Barn Name:</div><input name="name" placeholder="name" onChange={this.handleChange} value={this.state.barn.name}/><br/>
          </div>
          <div className="amenities">
            <div className="form-label">Amenities:</div>
            <ul className="array">
            {amenities}
            </ul>
            <input className="shorter-input" name="amenity" placeholder="amenities" onChange={this.handleAmenityChange} value={this.state.amenity}/><button className="plus-button" onClick={this.addAmenity}>+</button><br/>
          </div>
          <div className="basic-info">
            <div className="form-label">Board Cost:</div><input name="board_cost" placeholder="board_cost" onChange={this.handleChange} value={this.state.barn.board_cost}/><br/>
            <div className="address">
              <div className="form-label">Address:</div>
              <input name="street_address" placeholder="street address" onChange={this.handleAddressChange} value={this.state.barn.address.street_address}/><br/>
              <input name="city" placeholder="city" onChange={this.handleAddressChange} value={this.state.barn.address.city}/><br/>
              <input name="state" placeholder="state" onChange={this.handleAddressChange} value={this.state.barn.address.state}/><br/>
              <input name="zip" placeholder="zip" onChange={this.handleAddressChange} value={this.state.barn.address.zip}/><br/>
            </div>
            <div className="form-label">Number of Paddocks:</div>
            <input name="number_of_paddocks" placeholder="number of paddocks" onChange={this.handleChange} value={this.state.barn.number_of_paddocks}/><br/>
            <div className="form-label">Number of Stalls:</div>
            <input name="number_of_stalls" placeholder="number of stalls" onChange={this.handleChange} value={this.state.barn.number_of_stalls}/><br/>
          </div>
          <div className="images">
            <div className="form-label">Images:</div>
            <div className="form-sublabel">Main</div><input name="main" placeholder="image url" onChange={this.handleImageChange} value={this.state.barn.images.main}/><br/>
            <div className="form-sublabel">Indoor</div><input name="indoor_arena" placeholder="image url" onChange={this.handleImageChange} value={this.state.barn.images.indoor_arena}/><br/>
            <div className="form-sublabel">Outdoor</div><input name="outdoor_arena" placeholder="image url" onChange={this.handleImageChange} value={this.state.barn.images.outdoor_arena}/><br/>
            <div className="form-sublabel">Paddocks</div><input name="paddocks" placeholder="image url" onChange={this.handleImageChange} value={this.state.barn.images.paddocks}/><br/>
          </div>

          <input type="submit"/>
        </form>
      </div>
    )
  }
}


export default connect(null, {createBarn})(BarnCreationForm)
