import React from 'react';
import {connect} from 'react-redux'
import {createSupply} from '../actions/actions'
import SupplyCard from './SupplyCard'

class SupplyList extends React.Component{

  state={
    supply: {protein_fiber_fat:{
        protein: 0,
        fiber: 0,
        fat: 0,
      },
      type_of_supply:"",
      vendor:"",
      cost: 0.00,
      weight: 0,
      brand: "",
      name:""},
    viewable: false,
    addSupply: false
  }

  handleChange = (e)=>{
    this.setState({
      supply:{
        ...this.state.supply,
        [e.target.name]: e.target.value
      }
    })
  }

  handlePffChange = (e)=>{
    this.setState({
      supply:{
        ...this.state.supply,
        protein_fiber_fat:{
          ...this.state.supply.protein_fiber_fat,
          [e.target.name]: e.target.value
        }
      }
    })
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    const supply = {...this.state.supply}
    this.props.createSupply({ supply })
    this.setState({
      addSupply:false,
      viewable:false
    })
  }

  viewSupply = (e)=>{
    e.preventDefault()
    this.setState({
      viewable: !this.state.viewable
    })
  }

  handleClick = (e)=>{
    e.preventDefault()
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    })
  }

  render(){
    console.log("supplies", this.state)
    const suppliesTypes = ["hay", "grain", "shavings", "other"].map((t)=> <option value={t}> {t} </option>)
    const supplies = this.props.supplies.map((s, ind)=> <SupplyCard key={ind} supply={s} viewSupply={this.viewSupply} viewable={this.state.viewable}/>)
    const pff = <div className="pff">
        <input name="protein" onChange={this.handlePffChange} value={this.state.supply.protein} placeholder="Percentage of Protein"/>
        <input name="fat" onChange={this.handlePffChange} value={this.state.supply.fat} placeholder="Percentage of Fat"/>
        <input name="fiber" onChange={this.handlePffChange} value={this.state.supply.fiber} placeholder="Percentage of Fiber"/>
      </div>
    return(
       <div className="supply-list" >
        {supplies}
        <div className="supply-button">
          <button onClick={this.handleClick} name="addSupply"> {this.state.addSupply ? "Close Supply Form" : "Add a New Supply"} </button>
        </div>
       {this.state.addSupply ? <div className="new-supply">
         <form className="supply-form" onSubmit={this.handleSubmit}>
           <input onChange={this.handleChange} value={this.state.name} name="name" placeholder="Name of Product"/>
           <input type="number" onChange={this.handleChange} value={this.state.cost} name="cost" placeholder="Cost of Product"/>
           <input onChange={this.handleChange} value={this.state.weight} name="weight" placeholder="Weight of Product"/>
           <input onChange={this.handleChange} value={this.state.vendor} name="vendor" placeholder="Vendor of Product"/>
           <input onChange={this.handleChange} value={this.state.brand} name="brand" placeholder="Brand of Product"/>
           <select name="type_of_supply"onChange={this.handleChange} value={this.state.type_of_supply}>
              <option value=""> Choose a type of Supply </option>
              {suppliesTypes}
           </select>
           {this.state.supply.type_of_supply === "grain" ? pff : null}
           <br/>
           <input type="submit"/>
         </form>
       </div> : null}
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    supplies: state.supplies
  }
}


export default connect(mapStateToProps, {createSupply})(SupplyList)
