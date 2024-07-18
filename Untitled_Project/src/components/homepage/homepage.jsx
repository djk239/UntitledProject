import React from 'react';
import HomeNav from './homenav';
import styles from './homepage.module.css';
import Footer from '../Footer';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Header from '../Header';


const HomePage = () => {
  return (
    <div className= {styles.App}>
      <Header />
      <div className= {styles.content}>
        <div className={styles.title}>
          <h1 className={styles.melody}>Melody</h1>
          <h1 className={styles.mystery}>Mystery</h1>
        <p className= {styles.mainparagraph}>Welcome to Melody Mystery, the ultimate music guessing game! Test your music knowledge and see how well you know your favorite tunes. In this thrilling game, you'll be presented with short clips from a wide variety of songs. Your challenge is to guess the song title and artist as quickly as possible. The faster you guess correctly, the higher your score!</p>
        </div>
        <div className={styles.cardcontainer}>
          <h2 className={styles.games}>Games</h2>
          <div className={styles.cards}>
            <Link to="/melodymystery">
            <motion.img className={styles.card} src="/card1.png" whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}></motion.img>
            </Link>
            <motion.img className={`${styles.card} ${styles.transparent2}`} src="/images/comingsoon.png" whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} ></motion.img>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
