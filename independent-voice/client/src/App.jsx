import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navigation from './components/navigation/Navigation'
import Weather from './components/weather/Weather'
import Home from './components/home/Home'
import ArticleDetails from './components/article-details/ArticleDetails'

function App() {

  return (
    <>
      <Navigation />
      <Weather />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Details/:articleId" element={<ArticleDetails />} />
        </Routes>
      </div>
    </>
  )
}

export default App
