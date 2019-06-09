import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { API_KEY } from './utils/WeatherAPIKey';
import Weather from './components/Weather';

export default App = () => {
  const [ isLoading, setLoading ] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = (lat = 25, lon = 25) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        setTemperature(json.main.temp);
        setWeatherCondition(json.weather[0].main);
        setLoading(false);
      });
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      fetchWeather(position.coords.latitude, position.coords.longitude);
    },
    error => {
      setError('Error Gettig Weather Condtions');
    },
  );

    return (
      <View style={styles.container}>
        {
          error ? <Text>{error}</Text>
            : isLoading ? (
            <Text>Fetching The Weather</Text>
          ) : (
            <Weather weather={weatherCondition} temperature={temperature} />
          )
        }
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: '#f7b733',
    display: 'flex',
  },
});
