import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import styles from './Leaderboard.module.css';
import { fetchMyScore, fetchTopScores } from '../../api';
import { useAuth } from '../../AuthContext';
import { motion } from 'framer-motion';

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState(Array(10).fill({ username: 'N/A', score: 'N/A' }));
    const [myScore, setMyScore] = useState({});
    const [error, setError] = useState(null);
    const [errorMyScore, setErrorMyScore] = useState(null);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchScore = async () => {
            try {
                const scoreData = await fetchTopScores();
                const filledLeaderboard = scoreData.concat(Array(10 - scoreData.length).fill({ username: 'N/A', score: 'N/A' }));
                setLeaderboard(filledLeaderboard); // Update component state with fetched scores
                setError(null); // Clear any previous error
            } catch (error) {
                console.error(error);
                setError(error.message || 'Failed to fetch leaderboard.');
            }
        };

        fetchScore();
    }, []);

    useEffect(() => {
        const fetchUserScore = async () => {
            try {
                const scoreData = await fetchMyScore();
                setMyScore(scoreData); // Update component state with fetched score
                setErrorMyScore(null); // Clear any previous error
            } catch (error) {
                console.error(error);
                setErrorMyScore(error.message || 'Failed to fetch your score.');
            }
        };

        fetchUserScore();
    }, []);

    return (
        
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.leaderboard}>
                    <h1 className={styles.title}>Leaderboard</h1>
                    {isLoggedIn && 
                    <div className={styles.table}>
                        <div className={styles.others}>
                            <h2 className={styles.columnTitle}>Top 10</h2>
                            {error ? (
                                <p className={styles.error}>Error: {error}</p>
                            ) : (
                                leaderboard.map((user, index) => (
                                    <motion.p className={styles.players} key={index} whileHover={{ scale: 1.1 }}>{`${index + 1}. ${user.username}: ${user.score}`}</motion.p>
                                ))
                            )}
                        </div>
                        <div className={styles.bar} />
                        <div className={styles.self}>
                            <h2 className={styles.columnTitle}>You</h2>
                            {errorMyScore ? (
                                <p className={styles.error}>Error: {errorMyScore}</p>
                            ) : (
                                <motion.p className={styles.players} whileHover={{ scale: 1.1 }}>{`${myScore.username || 'N/A'}: ${myScore.score || 'N/A'}`}</motion.p>
                            )}
                        </div>
                    </div>
                        }
                    {!isLoggedIn && <p className={styles.please}>Please log in to view the leaderboards.</p>}
                </div>
            </div>
            <h1>ssss</h1><h1>ssss</h1><h1>ssss</h1><h1>ssss</h1><h1>ssss</h1><h1>ssss</h1><h1>ssss</h1><h1>ssss</h1><h1>ssss</h1><h1>ssss</h1>
            <Footer />
        </div>
    );
}
