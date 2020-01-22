import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text, Card, Divider} from 'react-native-elements';

export default class WeatherCard extends Component {
  render() {
    var date = new Date(this.props.detail.dt * 1000);
    var hours = date.getHours();
    var minutes = '0' + date.getMinutes();
    let date_ =
      date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear();
    let time = hours + ':' + minutes.substr(-2);

    return (
      <Card containerStyle={styles.card}>
        <Text style={styles.notes}>{this.props.location}</Text>

        <View style={styles.views}>
          <Image
            style={styles.icon}
            source={{
              uri:
                'https://openweathermap.org/img/w/' +
                this.props.detail.weather[0].icon +
                '.png',
            }}
          />
          <View style={styles.date_view}>
            <Text style={{fontSize: 18}}>{date_}</Text>
            <Text style={styles.time}>{time}</Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.notes}>
            {this.props.detail.weather[0].description}
          </Text>
          <Text style={styles.notes}>
            {Math.round(this.props.detail.main.temp * 100) / 100}&#8451;
          </Text>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(56,172,236,1)',
    borderWidth: 0,
    borderRadius: 20,
  },
  icon: {
    width: 100,
    height: 100,
  },
  notes: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  time: {
    fontSize: 39,
  },
  views: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date_view: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: '#dfe6e9',
    marginVertical: 20,
  },
});
