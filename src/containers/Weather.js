

import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Weather extends React.Component{

  state={
    currentTemp:0,
    highTemp:0,
    lowTemp:0,
    overallWeather:""
  }

  componentDidMount(){
    let zip = this.props.current_barn.address.zip
    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&APPID=${process.env.REACT_APP_SECRET_CODE}`)
      .then(r => r.json())
      .then(json=>(this.setState({
          currentTemp: parseInt(json.main.temp, 10),
          highTemp: parseInt(json.main.temp_max, 10),
          lowTemp: parseInt(json.main.temp_min, 10),
          overallWeather: json.weather[0].description,
          icon: json.weather[0].icon
        })
      ))

  }


  render(){
    const imgurl = `http://openweathermap.org/img/w/${this.state.icon}.png`

    return(
      <div >
        {this.props.currentUser ? <div className="weather">
          <img src={imgurl} alt="weather icon"/>
          <h5>Current Temperature is {this.state.currentTemp} &#x2109; and {this.state.overallWeather}.</h5>
        </div>: null}
      </div>
    )
  }
}
function mapStateToProps(state){
  return{
    currentUser:state.currentUser,
    current_barn:state.current_barn
  }
}

export default withRouter(connect(mapStateToProps)(Weather))
