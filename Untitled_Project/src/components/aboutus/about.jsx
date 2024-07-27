import React from 'react';
import styles from './aboutus.module.css';
import Footer from '../Footer';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import Header from '../Header';

// Web3Forms API Key stored in env (config.js on hosting)
const CONTACTURL = import.meta.env.VITE_CONTACTKEY;

const AboutUs = () => {

  // basic onsubmit function as provided by web3forms documentation
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", CONTACTURL);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      event.target.reset();
    } else {
      console.log("Error", data);
    }
  };


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
          <form onSubmit={onSubmit} className={styles.form}>
            <label className={styles.label}>Name</label>
            <input name="name" className={styles.input} type="text" placeholder="Enter your name" required/>
            <label className={styles.label}>Email</label>
            <input name="email" className={styles.input} type="email" placeholder="Enter your email" required/>
            <label className={styles.label}>Message</label>
            <textarea name="message" className={`${styles.messageInput} ${styles.input}`} placeholder="Message" required></textarea>
            <button className={styles.button} type="submit">Send</button>
          </form>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
