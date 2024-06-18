import React from 'react';
import { motion } from 'framer-motion';
import styles from './Trackprogress.module.css';

const Trackprogress = ({ progress, duration }) => {

  const variants = {
    growing: {
      width: `${progress}%`, // Progress length (20% * guess #)
      transition: { duration: duration, type: 'tween', ease: 'linear' }, 
    },
    //Dont animate reverse travel
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
    } 
    else {
      return styles.inactive; 
    }
  };

  return (
    <div className={styles.container}>
        <div className={styles.snippetlengths}>
        <h1 className={getClassName(0.5)}>0.5s</h1>
        <h1 className={getClassName(1)}>1s</h1>
        <h1 className={getClassName(2.5)}>2.5s</h1>
        <h1 className={getClassName(5)}>5s</h1>
        <h1 className={getClassName(10)}>10s</h1>
        </div>
        <div className={styles.tracklength}>
        <motion.div className={styles.trackprogress} initial={{ width: 0 }} animate={progress > 0 ? 'growing' : 'done'} variants={variants}/>
        </div>
    </div>
  );
};

export default Trackprogress;
