import { useState, useEffect } from 'react'
import styles from './App.module.css'
import Home from './components/homepage/homepage.jsx';
import Admin from './components/adminpanel/Admin.jsx';
import GamePage from './components/game/GamePage'
import { getAccessToken, removeTokens } from './api'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Leaderboard from './components/leaderboard/Leaderboard.jsx';
import AboutUs from './components/aboutus/about.jsx';
import { AuthProvider } from './AuthContext.jsx';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
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
