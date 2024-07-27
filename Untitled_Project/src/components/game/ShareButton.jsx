import React, { useMemo } from 'react';
import styles from './GamePopup.module.css';
import { motion } from "framer-motion"

export default function ShareButton({title, timetoguess}) {

  // Data to be shared. Title (basically useless). Title is sent to the shared user along with url. Everytime a song title is changed (new song) or a guess is made(to update guess time), the url is updated.
  const shareData = useMemo(() => ({
    title: 'Guessed it!',
    text: `I just guessed the song ${title} after only ${timetoguess} second(s) of listening! Give it a try!`,
    url: window.location.href,
  }), [title, timetoguess]);  

  // function to handle share with the above data. Contains fallback for nonsupported browsers.
  const handleShare = async () => {
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback for nonsupported browsers
      await navigator.clipboard.writeText(shareData.text + " : " + shareData.url);
      window.alert('Link copied to clipboard');
    }
  };

  return (
    <motion.button className={styles.button} onClick={handleShare} whileTap={{scale: 0.9}} whileHover={{scale: 1.05}} aria-label="Share your guess">
      Share
    </motion.button>
  );
}