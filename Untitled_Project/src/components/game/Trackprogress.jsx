import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Trackprogress.module.css';

const Trackprogress = ({ progress, duration, guessesRemaining }) => {
  const [activeTimes, setActiveTimes] = useState([]);

  useEffect(() => {
    setActiveTimes([]);
  }, [guessesRemaining]);

  useEffect(() => {
    const updatedActiveTimes = [];

    [0.5, 1, 2.5, 5, 10].forEach(time => {
      if (duration === time && !activeTimes.includes(time)) {
        updatedActiveTimes.push(time);
      }
    });

    setActiveTimes(prevTimes => [...prevTimes, ...updatedActiveTimes]);
  }, [duration, ]);

  const variants = {
    growing: {
      width: `${progress}%`, // Progress length (20% * guess #)
      transition: { duration: duration, type: 'tween', ease: 'linear' },
    },
    done: {
      width: `${0}%`,
      transition: { duration: 0.5, type: 'tween', ease: 'linear' },
    },
  };

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
      <div className={styles.snippetlengths}>
        {[0.5, 1, 2.5, 5, 10].map((time, index) => (
          <React.Fragment key={index}>
            {activeTimes.includes(time) && (
              <motion.h1
                className={getClassName(time)}
                initial={{ opacity: 0, x:-100 }}
                animate={{ opacity: 1, x:0 }}
                transition={{ duration: .8 }}
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
          animate={progress > 0 ? 'growing' : 'done'}
          variants={variants}
        />
      </div>
    </div>
  );
};

export default Trackprogress;
