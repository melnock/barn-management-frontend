import React from 'react';
import {connect} from 'react-redux'
import BarnCard from '../components/BarnCard'
import {fetchBarns} from '../actions/actions'

class BarnContainer extends React.Component{

  componentDidMount(){
    this.props.fetchBarns()
  }

  render(){
    console.log(this.props.barns)
    const barns = this.props.barns.map((barn)=>{
      return <BarnCard barn={barn} key={barn.id}/>
    })
    return(
      <div className="barn-list">
        {barns}
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
export default connect(mapStateToProps, {fetchBarns})(BarnContainer)
