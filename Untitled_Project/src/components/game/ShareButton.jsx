import React, { useMemo } from 'react';
import styles from './GamePopup.module.css';
import { motion } from "framer-motion"

export default function ShareButton() {
  const shareData = useMemo(() => ({
    title: 'I guessed it!',
    text: 'I just guessed the audio clip correctly!',
    url: window.location.href,
  }), []);

  const handleShare = async () => {
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback for older browsers
      const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`;
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <motion.button className={styles.button} onClick={handleShare} whileTap={{scale: 0.9}} whileHover={{scale: 1.05}} aria-label="Share your guess">
      Share
    </motion.button>
  );
}