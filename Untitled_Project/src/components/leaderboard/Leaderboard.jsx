import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import styles from './Leaderboard.module.css';
import { fetchMyScore, fetchTopScores } from '../../api';
import { useAuth } from '../../AuthContext';
import { motion } from 'framer-motion';

// Leaderboard component displays the top scores and the user's score
export default function Leaderboard() {
    // State to store the top leaderboard scores
    const [leaderboard, setLeaderboard] = useState(Array(10).fill({ username: 'N/A', score: 'N/A' }));
    // State to store the user's score
    const [myScore, setMyScore] = useState({});
    // State to manage errors for leaderboard and user's score
    const [error, setError] = useState(null);
    const [errorMyScore, setErrorMyScore] = useState(null);
    // Authentication context to check if the user is logged in
    const { isLoggedIn } = useAuth();

    // Effect hook to fetch top leaderboard scores on component mount
    useEffect(() => {
        const fetchScore = async () => {
            try {
                // Fetch top scores from API
                const scoreData = await fetchTopScores();
                // Fill the leaderboard with fetched scores and add placeholders if fewer than 10 scores
                const filledLeaderboard = scoreData.concat(Array(10 - scoreData.length).fill({ username: 'N/A', score: 'N/A' }));
                setLeaderboard(filledLeaderboard);
                setError(null); // Clear any previous error
            } catch (error) {
                console.error(error);
                setError(error.message || 'Failed to fetch leaderboard.'); // Set error message
            }
        };

        fetchScore();
    }, []);

    // Effect hook to fetch the user's score on component mount
    useEffect(() => {
        const fetchUserScore = async () => {
            try {
                // Fetch user's score from API
                const scoreData = await fetchMyScore();
                setMyScore(scoreData); // Update state with user's score
                setErrorMyScore(null); // Clear any previous error
            } catch (error) {
                console.error(error);
                setErrorMyScore(error.message || 'Failed to fetch your score.'); // Set error message
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
                    {isLoggedIn ? (
                        <div className={styles.table}>
                            <div className={styles.others}>
                                <h2 className={styles.columnTitle}>Top 10</h2>
                                {error ? (
                                    <p className={styles.error}>Error: {error}</p>
                                ) : (
                                    leaderboard.map((user, index) => (
                                        <motion.p className={styles.players} key={index} whileHover={{ scale: 1.1 }}>
                                            {`${index + 1}. ${user.username}: ${user.score}`}
                                        </motion.p>
                                    ))
                                )}
                            </div>
                            <div className={styles.bar} />
                            <div className={styles.self}>
                                <h2 className={styles.columnTitle}>You</h2>
                                {errorMyScore ? (
                                    <p className={styles.error}>Error: {errorMyScore}</p>
                                ) : (
                                    <motion.p className={styles.players} whileHover={{ scale: 1.1 }}>
                                        {`${myScore.username || 'N/A'}: ${myScore.score || 'N/A'}`}
                                    </motion.p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className={styles.please}>Please log in to view the leaderboards.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
