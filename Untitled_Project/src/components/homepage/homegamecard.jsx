import React from 'react'
import { Link } from 'react-router-dom';
import styles from './homegamecard.module.css'
const Homegamecard = () => {
  return (
    <div>
        <Link to={'/melodymystery'} className= {`${styles.card} ${styles.card1} ${styles.transparent1}`}>
            <h5>Play Game</h5>
        </Link>
        <div className= {`${styles.card} ${styles.card2} ${styles.transparent2}`}>
            <h5>Coming Soon</h5>
        </div>
        <div className={`${styles.card} ${styles.card3} ${styles.transparent3}`}>
            <h5>Coming Soon</h5>
        </div>
        <div className={`${styles.card} ${styles.card4} ${styles.transparent4}`}>
            <h5>Coming Soon</h5>
        </div>
        <div className={`${styles.card} ${styles.card5} ${styles.transparent5}`}>
            <h5>Coming Soon</h5>
        </div>
        <div className={`${styles.card} ${styles.card6} ${styles.transparent6}`}>
            <h5>Coming Soon</h5>
        </div>
        
    </div>
  )
}

export default Homegamecard
