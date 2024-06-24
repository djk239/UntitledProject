import React from 'react'
import Header from '../Header'
import Footer from '../Footer';
import Game from './Game'
import styles from './GamePage.module.css';

export default function GamePage(isLoggedIn, handleLog, handleLogout) {
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
