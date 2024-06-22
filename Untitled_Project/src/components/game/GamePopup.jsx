import React from 'react';
import styles from './GamePopup.module.css'; // Define your styles here
import ShareButton from './ShareButton';
import { motion } from "framer-motion"

export default function GamePopup({ guessesTaken, correctTitle, correctArtist, handleNextBtn }) {
  if (correctTitle.length > 2) {
    return (
        <div className={styles.container}>
            <motion.div
            className={`${styles.popup} ${styles.correct}`}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
                <h2>Congratulations!</h2>
                <p>Guesses taken: {guessesTaken}</p>
                <p>{correctTitle}</p>
                <p>{correctArtist}</p>
                <div className={styles.buttonWrapper}>
                  <button className={styles.button} onClick={handleNextBtn}>Next</button>
                  <ShareButton />
                </div>
            </motion.div>
        </div>
    );
  } else {
    return (
        <div className={styles.container}>
            <motion.div
            className={`${styles.popup} ${styles.incorrect}`}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
                <h2>Incorrect</h2>
                <p>Sorry, maybe it'll come up again.</p>
                <button className={styles.button} onClick={handleNextBtn}>Try Again</button>
        </motion.div>
      </div>
    );
  }
};
