import React, {Component} from 'react';
import {FlatList} from 'react-native';
import WeatherCard from './components/weatherCard';
import Geolocation from '@react-native-community/geolocation';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      today_date: new Date(),
      latitude: 0,
      longitude: 0,
      weather: [],
      error: '',
    };
  }

  componentDidMount() {
    this.getGeoLocation();
  }

  getGeoLocation() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState(
          prevState => ({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
          () => {
            this.getWeather();
          },
        );
      },
      error => this.setState({forcast: error.message}),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  getWeather() {
    let url =
      'https://api.openweathermap.org/data/2.5/forecast?lat=' +
      this.state.latitude +
      '&lon=' +
      this.state.longitude +
      '&units=metric&APPID=63c84680580837796b0b491e56e61009';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        data.list = data.list.slice(0, 9);
        let closest_time = [data.list[0]];
        for (let i = 1; i < 9; ++i) {
          if (
            Math.abs(this.state.today_date - data.list[i].dt * 1000) <
            Math.abs(this.state.today_date - closest_time[0].dt * 1000)
          ) {
            closest_time[0] = data.list[i];
          }
        }
        data.list = closest_time;
        this.setState((prevState, props) => ({
          weather: data,
        }));
      });
  }

  render() {
    return (
      <FlatList
        data={this.state.weather.list}
        style={{marginTop: 20}}
        keyExtractor={item => item.dt.toString()}
        renderItem={({item}) => (
          <WeatherCard detail={item} location={this.state.weather.city.name} />
        )}
      />
    );
  }
}
