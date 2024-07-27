import { useState, useEffect } from 'react'
import styles from './App.module.css'
import Home from './components/homepage/homepage.jsx';
import Admin from './components/adminpanel/Admin.jsx';
import GamePage from './components/game/GamePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Leaderboard from './components/leaderboard/Leaderboard.jsx';
import AboutUs from './components/aboutus/about.jsx';
import { AuthProvider } from './AuthContext.jsx';



// Base url from env (config.js on hosting)
const API_BASE_URL =  (window.config && window.config.API_BASE_URL) || import.meta.env.API_BASE_URL;

function App() {

  // Used to mount CSRF token to axios on mount
  useEffect(() => {
    const setUpAxiosCsrf = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/csrf-token/`);
        axios.defaults.headers.common['X-CSRFToken'] = response.data.csrfToken;
      } catch (error) {
        console.error('Error fetching CSRF token', error);
      }
    };

    setUpAxiosCsrf();
  }, []);


  // Routes to pages
  return (
    <AuthProvider>
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/leaderboards" element={<Leaderboard />} />
          <Route path="/melodymystery" element={<GamePage />}  />
          <Route path="/terms" element={<AboutUs />}  />
          <Route path="/privacy" element={<AboutUs />}  />

        </Routes>
      </Router>
    </AuthProvider>
    

  )
}

export default App
