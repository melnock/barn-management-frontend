import React from 'react';
import {connect} from 'react-redux'
import {selectedBarn} from '../actions/actions'
import BarnExtraInfoCard from './BarnExtraInfoCard'



class BarnCard extends React.Component{
  state={
    slideIndex:-1
  }

  handleClick=()=>{
    this.props.selectedBarn(this.props.barn)
  }

  componentDidMount(){
    this.carousel()
  }

  carousel=(slideIndex)=> {

    if (this.state.slideIndex > 2) {this.setState({slideIndex:-1})}
      this.setState({
        slideIndex: this.state.slideIndex+1
      })

      setTimeout(this.carousel, 5000); // Change image every 3 seconds
  }

  render(){
    const bimage=`barnImages-${this.props.barn.id}`
    const imageCarousel = [<img className={bimage} alt="barn" src={this.props.barn.images.main}/>,
            <img className={bimage} alt="barn" src={this.props.barn.images.indoor_arena}/>,
            <img className={bimage} alt="barn" src={this.props.barn.images.outdoor_arena}/>,
            <img className={bimage} alt="barn" src={this.props.barn.images.paddocks}/>][this.state.slideIndex]

    if (this.props.barn === this.props.chosenBarn){
      return(<div className="chosen-barn-card" onClick={this.handleClick}>
           <h1> {this.props.barn.name}</h1>
           {imageCarousel}
           <BarnExtraInfoCard/>
           </div> )
    }else{
      return(
        <div className="barn-card" onClick={this.handleClick}>
              <h1> {this.props.barn.name}</h1>
              {imageCarousel}
        </div>
      )
    }
  }
}

function mapStateToProps(state){
  return{
    barns: state.barns,
    chosenBarn: state.selectedBarn
  }
}


export default connect(mapStateToProps, {selectedBarn})(BarnCard)
