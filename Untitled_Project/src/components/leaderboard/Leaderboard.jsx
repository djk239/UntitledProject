import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import styles from './Leaderboard.module.css'

export default function Leaderboard() {

    const headersArray = Array.from({ length: 10 }, (_, index) => `${index + 1}. Player `);
  return (
    <div className={styles.container} >
        <Header />
        <div className={styles.content}>
            <div className={styles.leaderboard}>
                <h1 className={styles.title}>Leaderboard</h1>
                <div className={styles.table}>
                    <div className={styles.others}>
                        <h2>Top 10</h2>
                        {headersArray.map((text, index) => (
                        <p key={index}>{text}</p>
                        ))}
                    </div>
                    <div className={styles.bar}/>
                    <div className={styles.self}>
                        <h2>You</h2>
                        <p>{headersArray[0]}</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}
