import React from 'react';
import './weather.css'
import { useState, useEffect } from 'react';
import fetchWeather from '/src/APIs/weatherAPI.js';

const cities = [
    { name: 'София', lat: 42.6977, lon: 23.3219 },
    { name: 'Пловдив', lat: 42.1354, lon: 24.7453 },
    { name: 'Варна', lat: 43.2141, lon: 27.9147 },
    { name: 'Бургас', lat: 42.5048, lon: 27.4626 },
    { name: 'Русе', lat: 43.8356, lon: 25.9657 },
    { name: 'Стара Загора', lat: 42.4258, lon: 25.6345 },
    { name: 'Плевен', lat: 43.4170, lon: 24.6067 },
    { name: 'Сливен', lat: 42.6818, lon: 26.3231 },
    { name: 'Добрич', lat: 43.5726, lon: 27.8273 },
    { name: 'Шумен', lat: 43.2700, lon: 26.9229 },
    { name: 'Хасково', lat: 41.9320, lon: 25.5521 },
    { name: 'Кърджали', lat: 41.6330, lon: 25.3777 },
    { name: 'Търговище', lat: 43.2683, lon: 26.6010 },
    { name: 'Кюстендил', lat: 42.2833, lon: 22.7167 },
    { name: 'Ямбол', lat: 42.4833, lon: 26.5000 },
    { name: 'Велико Търново', lat: 43.0833, lon: 25.6167 },
    { name: 'Габрово', lat: 42.8667, lon: 25.3333 }
  ];

export default function(){
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


    return(
    <div className="wrapper">
        <div className="track">
            {weatherData.map((item, index) => (
                <div key={index} className="card">
                    <h1 key={index}>{item.name} {item.weather.main.temp}</h1>
                </div>
            ))}
        </div>
    </div>

    )
}