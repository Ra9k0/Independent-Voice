import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navigation from './components/navigation/Navigation'
import Home from './components/home/Home'
import ArticleDetails from './components/article-details/ArticleDetails'
import AllNews from './components/all-news/AllNews'
import Login from './components/login/Login';
import Register from './components/register/Register';
import Logout from './components/logout/Logout';
import EditNew from './components/edit-new/EditNew';
import { AuthProvider } from './contexts/AuthContext';
import CreateNew from './components/create-new/CreateNew';
import MyNews from './components/my-news/MyNews';
import NotFound from './components/not-found/NotFound';

function App() {

  return (
    <AuthProvider>
      <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Details/:articleId" element={<ArticleDetails />} />
          <Route path="/All" element={<AllNews />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/EditNew/:articleId" element={<EditNew />} />
          <Route path="/CreateNew" element={<CreateNew />} />
          <Route path="/MyNews" element={<MyNews />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
    </AuthProvider>
  )
}

export default App
