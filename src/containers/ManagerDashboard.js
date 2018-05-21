import React from 'react';
import {connect} from 'react-redux'
import BarnCard from '../components/BarnCard'
import {fetchBarns} from '../actions/actions'

class ManagerDashboard extends React.Component{

  componentDidMount(){
    this.props.fetchBarns()
  }

  render(){
    console.log(this.props.barns)
    const barns = this.props.barns.map((barn)=>{
      return <BarnCard barn={barn} key={barn.id}/>
    })
    return(
      <div>
        {barns}
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    barns: state.barns,
  }
}
export default connect(mapStateToProps, {fetchBarns})(ManagerDashboard)
