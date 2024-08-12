import React, { useState, useEffect } from 'react';

const WeatherEmoji = ({ icon }) => {
  
    // Construct the URL for the weather icon image
    const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
  
    return (
      <img 
        src={iconUrl} 
        alt="Weather Icon" 
        style={{ width: '50px', height: '50px' }} // Adjust size as needed
      />
    );
  };

export default WeatherEmoji;
