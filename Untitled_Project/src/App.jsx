import { useState, useEffect } from 'react'
import styles from './App.module.css'
import Admin from './components/adminpanel/Admin.jsx';
import GamePage from './components/game/GamePage'
import { getAccessToken, removeTokens } from './api'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Leaderboard from './components/leaderboard/Leaderboard.jsx';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    // Check if access token exists in local storage
    const token = getAccessToken();
    setIsLoggedIn(!!token); // Set isLoggedIn based on the presence of the token
  }, []);

  const handleLog = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    removeTokens();
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GamePage isLoggedIn={isLoggedIn} handleLog={handleLog} handleLogout={handleLogout}/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/leaderboards" element={<Leaderboard isLoggedIn={isLoggedIn} handleLog={handleLog} handleLogout={handleLogout} />} />
      </Routes>
    </Router>

  )
}

export default App
