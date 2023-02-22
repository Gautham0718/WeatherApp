import React, { useState, useEffect } from 'react';

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = '2fa73590fd8b5a4c6e68098ad5625395';

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
        .catch(error => console.error(error));
    });
  }, [API_KEY]);

  return (
    <div>
      {weatherData &&
        <>
            <div className="header">
                <h1>Gi's Weather App</h1>
            </div>
            <h2>{weatherData.name}</h2>
            <p>{weatherData.weather[0].description}</p>
            <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
            <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather icon" />
        </>
      }
    </div>
  );
}

export default WeatherApp;
