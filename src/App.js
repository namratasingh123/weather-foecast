import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchData } from "./actions/weatherStation";

import WeatherForecast from './components/WeatherForecast';

@connect(store => {  
  return {
    forecast: store.weatherStation.data
  }
})
export default class App extends Component {

  // Fetches data by using geolocation
  componentDidMount() {  
    const detectLocation = new Promise((resolve,reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position.coords);
        }, (error) => {
          if(error.code === error.PERMISSION_DENIED) {
            console.error("Error detecting location.");
          }
        });
      }
    });

    detectLocation.then((location) => {
      this.props.dispatch(fetchData(location));
    }).catch(() => {
      this.props.dispatch(fetchData("london"));//default loction
    });
  }

  render() {
    const { forecast } = this.props;

    return (
      forecast === null ? (
        <div className="loading">
        
        </div>
      ) : (
        <div>
          <WeatherForecast data={forecast} />
           
        </div>
      )
    );
  }
}