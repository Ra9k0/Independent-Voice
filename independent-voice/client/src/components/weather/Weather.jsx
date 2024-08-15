import React from 'react';
import './weather.css'
import WeatherEmoji from './weather-emoji/WeatherEmoji'
import { useState, useEffect } from 'react';
import fetchWeather from '/src/APIs/weatherAPI.js';

const cities = [
    { name: 'Sofia', lat: 42.6977, lon: 23.3219 },
    { name: 'Plovdiv', lat: 42.1354, lon: 24.7453 },
    { name: 'Varna', lat: 43.2141, lon: 27.9147 },
    { name: 'Burgas', lat: 42.5048, lon: 27.4626 },
    { name: 'Ruse', lat: 43.8356, lon: 25.9657 },
    { name: 'Stara Zagora', lat: 42.4258, lon: 25.6345 },
    { name: 'Pleven', lat: 43.4170, lon: 24.6067 },
    { name: 'Sliven', lat: 42.6818, lon: 26.3231 },
    { name: 'Dobrich', lat: 43.5726, lon: 27.8273 },
    { name: 'Shumen', lat: 43.2700, lon: 26.9229 },
    { name: 'Haskovo', lat: 41.9320, lon: 25.5521 },
    { name: 'Kardzhali', lat: 41.6330, lon: 25.3777 },
    { name: 'Targovishte', lat: 43.2683, lon: 26.6010 },
    { name: 'Kyustendil', lat: 42.2833, lon: 22.7167 },
    { name: 'Yambol', lat: 42.4833, lon: 26.5000 },
    { name: 'Veliko Tarnovo', lat: 43.0833, lon: 25.6167 },
    { name: 'Gabrovo', lat: 42.8667, lon: 25.3333 }
];


export default function () {
    const [weatherData, setWeatherData] = useState([]);

    const updateWeatherData = async () => {
        const data = await Promise.all(
            cities.map(async city => {
                const weather = await fetchWeather(city.lat, city.lon);
                return { ...city, weather };
            })
        );

        setWeatherData(data);
    };

    useEffect(() => {
        updateWeatherData(); // Initial fetch
        const intervalId = setInterval(updateWeatherData, 60000); // Update every minute

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, []);

    return (
        <div className="wrapper">
            <div className="track">
                {weatherData.map((item, index) => (
                    <div key={index} className="cardContainer">
                    <div className="card">
                        <p className="city">{item.name}</p>
                        <p className="weather">{item.weather.weather[0].main}</p>
                        <svg
                            className="weather"
                            version="1.1"
                            id="Layer_1"
                            x="0px"
                            y="0px"
                            width="50px"
                            height="50px"
                            viewBox="0 0 100 100">
                            <WeatherEmoji icon={item.weather.weather[0].icon} />
                        </svg>
                        <p className="temp">{Math.round(item.weather.main.temp)}</p>
                        <div className="minmaxContainer">
                            <div className="min">
                                <p className="minHeading">Min</p>
                                <p className="minTemp">{Math.round(item.weather.main.temp_min)}</p>
                            </div>
                            <div className="max">
                                <p className="maxHeading">Max</p>
                                <p className="maxTemp">{Math.round(item.weather.main.temp_max)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>

    )
}