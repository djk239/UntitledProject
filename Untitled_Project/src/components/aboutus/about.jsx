import React from 'react';
import styles from './aboutus.module.css';
import Footer from '../Footer';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Header from '../Header';


const AboutUs = () => {
  return (
    <div className= {styles.App}>
      <Header />
      <div className= {styles.content}>
        <section className={styles.about}>
          <h1 className={styles.title}>About Us</h1>
          <img className={styles.cartoon} src="./cartoonfellas.png"></img>
          <p className={styles.paragraph}>A group of friends with a passion for code and love for music. Together we were able to put aside the time
            to create this app. Starting out as a fun side project just for something to get our gears turning and for ourselves to play quickly turned into more.
            As the project began to get bigger and more scalable we figured we should share it with the world. Starting with Melody Mystery we plan
            to introduce to much more to the site in terms of games. We hope you enjoy using our app and thank you for your support!
            Stick around as we plan to release continuous updates improving the game.
          </p>
        </section>
        <section className={styles.contact}>
          <h1 className={styles.title}>Contact Us</h1>
          <form className={styles.form}>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Message"></textarea>
            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
