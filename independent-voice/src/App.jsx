import React from 'react';
import './App.css'
import Navigation from './components/navigation/Navigation'
import Weather from './components/weather/Weather'
import Home from './components/home/Home'

function App() {

  return (
    <>
      <Navigation />    
      <Weather />
      <div className="container">
      <Home />
      </div>
    </>
  )
}

export default App
