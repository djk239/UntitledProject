import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Trackprogress.module.css';

const Trackprogress = ({ progress, duration, guessesRemaining }) => {
  const [activeTimes, setActiveTimes] = useState([]);
  const [internalProgress, setInternalProgress] = useState(progress);

  // reset active times when guesses remaining changes (resets every guess but the next useeffect will repopulate with approatite durations based on duration(think of this as a fallback))
  useEffect(() => {
    setActiveTimes([]);
  }, [guessesRemaining]);

  // Update active times based on duration time (add the duration to the active times array)
  useEffect(() => {
    const updatedActiveTimes = [];

    [0.5, 1, 2.5, 5, 10].forEach(time => {
      if (duration === time && !activeTimes.includes(time)) {
        updatedActiveTimes.push(time);
      }
    });

    setActiveTimes(prevTimes => [...prevTimes, ...updatedActiveTimes]);
  }, [duration]);

  // Set internal progress based on progress prop 
  useEffect(() => {
    if (progress === 0) {
      setInternalProgress(0);
    } else {
      setInternalProgress(progress);
    }
  }, [progress]);

  // Animation variants
  const variants = {
    growing: {
      width: `${internalProgress}%`,
      transition: { duration: duration, type: 'tween', ease: 'linear' },
    },
    reset: {
      width: `0%`,
      transition: { duration: 0.5, type: 'tween', ease: 'linear' },
    },
  };

  // Utility function to get class name based on duration of the song being played. If a guess is made, the class name changes. 
  const getClassName = (expectedDuration) => {
    if (duration > expectedDuration) {
      return styles.incorrect;
    } else if (duration === expectedDuration) {
      return styles.active;
    } else {
      return styles.inactive;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lencontainer}>
        <h2>0</h2>
        <h2>10</h2>
      </div>
      <div className={styles.snippetlengths}>
        {[0.5, 1, 2.5, 5, 10].map((time, index) => (
          <React.Fragment key={index}>
            {activeTimes.includes(time) && (
              <motion.h1
                className={getClassName(time)}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {time}s
              </motion.h1>
            )}
            {!activeTimes.includes(time) && (
              <h1 className={getClassName(time)}>
                {time}s
              </h1>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className={styles.tracklength}>
        <motion.div
          className={styles.trackprogress}
          initial={{ width: 0 }}
          animate={progress > 0 ? 'growing' : 'reset'}
          variants={variants}
          onAnimationComplete={() => {
            if (progress === 0) {
              setInternalProgress(0); // Ensure progress resets to 0 after animation
            }
          }}
        />
      </div>
    </div>
  );
};

export default Trackprogress;
