import { useState, useEffect } from 'react'
import styles from './App.module.css'
import Home from './components/homepage/homepage.jsx';
import Admin from './components/adminpanel/Admin.jsx';
import GamePage from './components/game/GamePage'
import { getAccessToken, removeTokens } from './api'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Leaderboard from './components/leaderboard/Leaderboard.jsx';
import { AuthProvider } from './AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/leaderboards" element={<Leaderboard />} />
          <Route path="/melodymystery" element={<GamePage />}  />
        </Routes>
      </Router>
    </AuthProvider>

  )
}

export default App
