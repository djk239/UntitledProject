import React, { useMemo } from 'react';
import styles from './GamePopup.module.css';
import { motion } from "framer-motion"

export default function ShareButton({title, timetoguess}) {
  const shareData = useMemo(() => ({
    title: 'Guessed it!',
    text: `I just guessed the song ${title} after only ${timetoguess} second(s) of listening! Give it a try!`,
    url: 'https://www.melodymystery.com/melodymystery',
  }), [title, timetoguess]);  

  const handleShare = async () => {
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback for nonsupported browsers
      await navigator.clipboard.writeText(shareData.text + " : " + shareData.url);
      window.alert('Link copied to clipboard:\n' + fallbackText);
    }
  };

  return (
    <motion.button className={styles.button} onClick={handleShare} whileTap={{scale: 0.9}} whileHover={{scale: 1.05}} aria-label="Share your guess">
      Share
    </motion.button>
  );
}