import React, { Component } from "react";


export default class ForecastTiles extends Component {

  // Filters the data by date and returns an Object containing a list of 5-day forecast.
  _groupByDays = data => {
    return (data.reduce((list, item) => {
      const forecastDate = item.dt_txt.substr(0,10);
      list[forecastDate] = list[forecastDate] || [];
      list[forecastDate].push(item);

      return list;
    }, {}));
  };

  // Returns week of the day
  _getDayInfo = data => {
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return daysOfWeek[new Date(data[0].dt * 1000).getDay()];
  };

  
  // Gets the Min, Max and Avg Humidity temperature
  _getInfo = (data, min=[], max=[], humidity=[]) => {
    data.map(item => {
      max.push(item.main.temp_max);
      min.push(item.main.temp_min);
      humidity.push(item.main.humidity);
    });

    const minMax = {
      min: Math.round(Math.min(...min)),
      max: Math.round(Math.max(...max)),
    };

    // Gets the day's avg humdity
    const avgHumdity = Math.round(humidity.reduce((curr, next) => curr + next) / humidity.length);

    return (
      <div className="weather-info">
        <div className="min-max">
          <strong>MAX-{`${minMax.max}°C`}</strong><br /> MIN- {`${minMax.min}°C`}
        </div>
        <div className="more-info">
          {`Avg. Humidity: ${avgHumdity}%`}
        </div>
      </div>
    );
  };

  
  render() {

    const { forecasts } = this.props;
    const tiles = Object.values(this._groupByDays(forecasts));

    //filter for 5 day instead of 6
    const forecastTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;

    return (
      <div className="">
        {forecastTiles.map((item, i) => (
         
            <div className="primary-info">
              <div className="icon">
                
                {this._getDayInfo(item)}
              </div>
              {this._getInfo(item)}
            </div>
                    
        ))}
      </div>
    );
  }
}

