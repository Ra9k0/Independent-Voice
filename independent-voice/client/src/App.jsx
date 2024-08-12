import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navigation from './components/navigation/Navigation'
import Home from './components/home/Home'
import ArticleDetails from './components/article-details/ArticleDetails'

function App() {

  return (
    <>
      <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Details/:articleId" element={<ArticleDetails />} />
        </Routes>
    </>
  )
}

export default App
