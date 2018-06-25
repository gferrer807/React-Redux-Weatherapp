import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map'

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    // const temps = cityData.list.map(weather => weather.main.temp);
    const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp - 273);
    const pressure = cityData.list.map(weather => weather.main.pressure);
    const humidity = cityData.list.map(weather => weather.main.humidity);
    // const lon = cityData.city.coord.lon;
    // const lat = cityData.city.coord.lat;
    const { lon, lat } = cityData.city.coord; //this is the same as the 2 upper lines, just shorter.
    return (
      // this is not mandatory, just not to receive the consol warning message about giving it a specific key.
      <tr key={name}>

        <td><GoogleMap lon={lon} lat={lat} /> </td>
        <td><Chart data={temps} color="orange" units="Celsius"/></td>
        <td><Chart data={pressure} color="green" units ="hPa"/></td>
        <td><Chart data={humidity} color="blue" units="%"/></td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (Celsius)</th>
            <th>Pressure</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}

// function mapStateToProps(state) {
//   return { weather: state.weather}; //the key here is weather because in the reducers, it's called weather.
// } this is identical to this:

function mapStateToProps({ weather }) {
  return { weather }; // this is exactly like {weather: weather}
}

export default connect(mapStateToProps)(WeatherList);
