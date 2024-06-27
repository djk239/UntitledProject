import React from 'react'
import Header from '../Header'
import Footer from '../Footer';
import Game from './Game'
import styles from './GamePage.module.css';

export default function GamePage() {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.content}>
        <Game />
      </div>
      <Footer />
    </div>
  )
}
