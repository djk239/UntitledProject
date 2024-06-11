import { useState, useEffect } from 'react'
import styles from './App.module.css'
import Header from './components/Header'
import Footer from './components/Footer'
import PopupMenu from './components/PopupMenu'
import Game from './components/game/Game'
import { getAccessToken, removeTokens } from './api'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    // Check if access token exists in local storage
    const token = getAccessToken();
    setIsLoggedIn(!!token); // Set isLoggedIn based on the presence of the token
  }, []);

  const handleLog = () => {
    setIsLoggedIn(true);
    console.log('test22s34232');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    removeTokens();
  };

  return (
    <div className={styles.App}>
      <Header isLoggedIn={isLoggedIn} handleLog={handleLog} handleLogout={handleLogout}/>
      <div className={styles.content}>
        <Game isLoggedIn={isLoggedIn}/>
      </div>
      <Footer />
    </div>
  )
}

export default App
