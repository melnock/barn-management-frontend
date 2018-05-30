import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Line} from 'react-chartjs-2'
// import Moment from 'react-moment'

class HorseManagerChart extends React.Component{
  state={
    monthly: false
  }

  handleClick = (e)=>{
    this.setState({
      monthly: !this.state.monthly
    })
  }



//   myChart = new Chart(ctx(), {
//     type: 'bar',
//     data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.05)',
//                 'rgba(54, 162, 235, 0.05)',
//                 'rgba(255, 206, 86, 0.05)',
//                 'rgba(75, 192, 192, 0.05)',
//                 'rgba(153, 102, 255, 0.05)',
//                 'rgba(255, 159, 64, 0.05)'
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });

  render(){
    const horseData = this.props.healthreports.filter((hr)=>{
      return hr.horse_id === this.props.selectedHorse.id
    })
    const dateToFormat = new Date();
    const daysOfWeek=["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
    const getDate = daysOfWeek[dateToFormat.getDay()]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    const month = []

    const prevMonth = ()=>{
      let d = new Date()
      for (let i=0; i<30; i++ ){
        d.setDate(d.getDate() - 1)
        const monthToManipulate = months[d.getMonth()]
        const dayToManipulate = d.getDate()
        month.unshift(monthToManipulate + " " + dayToManipulate)
      }
      return month
    }

    const labels = this.state.monthly ? prevMonth() : [...daysOfWeek.slice(daysOfWeek.indexOf(getDate)+1, daysOfWeek.length), ...daysOfWeek.slice(0, daysOfWeek.indexOf(getDate)+1)]

    const horseDataEdited = this.state.monthly ? horseData.slice(horseData.length-30) : horseData.slice(horseData.length-7)

    const graindataset = horseDataEdited.map((h)=> h.grain)
    const haydataset = horseDataEdited.map((h)=> h.hay)
    const waterdataset = horseDataEdited.map((h)=> h.water)
    const manuredataset = horseDataEdited.map((h)=> h.manure)
    console.log(horseDataEdited)
    const data = {
            labels: labels,
            datasets: [{
                label: 'Grain Consumption',
                data: graindataset,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.05)',
                    'rgba(54, 162, 235, 0.05)',
                    'rgba(255, 206, 86, 0.05)',
                    'rgba(75, 192, 192, 0.05)',
                    'rgba(153, 102, 255, 0.05)',
                    'rgba(255, 159, 64, 0.05)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],

                borderWidth: 1
            },
            {
                label: 'Water Consumption',
                data: waterdataset,
                backgroundColor: [
                    'rgba(100, 255, 255, 0.05)',
                    'rgba(54, 162, 235, 0.05)',
                    'rgba(255, 206, 86, 0.05)',
                    'rgba(75, 192, 192, 0.05)',
                    'rgba(153, 102, 255, 0.05)',
                    'rgba(255, 159, 64, 0.05)'
                ],
                borderColor: [
                    'rgba(100,255,255,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],

                borderWidth: 1
            },
            {
                label: 'Hay Consumption',
                data: haydataset,
                backgroundColor: [
                    'rgba(100, 255, 132, 0.05)',
                    'rgba(54, 162, 235, 0.05)',
                    'rgba(255, 206, 86, 0.05)',
                    'rgba(75, 192, 192, 0.05)',
                    'rgba(153, 102, 255, 0.05)',
                    'rgba(255, 159, 64, 0.05)'
                ],
                borderColor: [
                    'rgba(100,255,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],

                borderWidth: 1
            },
            {
                label: 'Manure',
                data: manuredataset,
                backgroundColor: [
                    'rgba(255, 255, 255, 0)',
                    'rgba(54, 162, 235, 0)',
                    'rgba(255, 206, 86, 0)',
                    'rgba(75, 192, 192, 0)',
                    'rgba(153, 102, 255, 0)',
                    'rgba(255, 159, 64, 0)'
                ],
                borderColor: [
                    'rgba(255,255,255,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],

                borderWidth: 1
            }]
        };

      const options = {
        animation: {
            animateScale: true
        },
        scales: {
          yAxes: [{
              display: true,
              ticks: {
                  beginAtZero: true,   // minimum value will be 0.
                  steps: 10,
                  stepValue: 1,
              }
          }],
          xAxes: [{
                      display: true,
                  }]
        }
      };

    return(
      <div>
        <button onClick={this.handleClick}>{this.state.monthly? "Daily" : "Monthly"}</button>
        <Line data={data} options={options}/>
      </div>
    )
  }


}

function mapStateToProps(state){
  return {
    healthreports: state.healthreports,
    selectedHorse: state.selectedHorse
  }
}
export default withRouter(connect(mapStateToProps, {})(HorseManagerChart))
