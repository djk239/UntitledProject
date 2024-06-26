import React, {useEffect, useState} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import styles from './Leaderboard.module.css'
import { fetchMyScore, fetchTopScores } from '../../api'

export default function Leaderboard({isLoggedIn, handleLog, handleLogout}) {

    const [leaderboard, setLeaderboard] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetchTopScores();    
                const data = await response.json();
                setLeaderboard(data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchLeaderboard();
    }, []);


    console.log(typeof handleLog)
    const loadtop10 = async () => {
        const clip = await fetchTopScores();
        console.log(clip);
      };
    
    const headersArray = Array.from({ length: 10 }, (_, index) => `${index + 1}. Player `);
  return (
    <div className={styles.container} >
        <Header isLoggedIn={isLoggedIn} handleLog={handleLog} handleLogout={handleLogout} />
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
                    <button onClick={loadtop10}>CLICKKKKK</button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}
