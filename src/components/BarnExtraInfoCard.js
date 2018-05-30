import React from 'react';
import {connect} from 'react-redux'
import {selectedBarn} from '../actions/actions'




class BarnExtraInfoCard extends React.Component{
  state={
    slideIndex:-1
  }

  handleClick=()=>{
    this.props.selectedBarn(null)
  }


  render(){
    console.log("woo");
    let amenities;
    if (this.props.chosenBarn){
      amenities = this.props.chosenBarn.amenities.map((a, ind)=>(<li key={ind}>{a}</li>))
      return(
        <div className="barn-extra-info-card" onClick={this.handleClick}>
          <div>
          <h5>{this.props.chosenBarn.address.city + ", " + this.props.chosenBarn.address.state}</h5>
          <ul>
            {amenities}
          </ul>
          </div>

        </div>
      )
    }else{
      return <div></div>
    }
  }
}

function mapStateToProps(state){
  return{
    barns: state.barns,
    chosenBarn: state.selectedBarn
  }
}


export default connect(mapStateToProps, {selectedBarn})(BarnExtraInfoCard)
