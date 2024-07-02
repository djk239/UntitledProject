import React from 'react';
import styles from './aboutus.module.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>About Us</h1>
        <p>.Non quia facilis est, sed quia hard.</p>
      </div>
      <section className={styles.about}>
        <div className={styles.aboutimage}>
          <img src="./public/images/cartoonguys.png" alt="Image" />
        </div>
        <div className={styles.aboutcontent}>
          {/* Additional content goes here */}
          <h2>Welcome User</h2>
          <p>This is the story...</p>
          <Link to={'/'} className={styles.homelink}>Home</Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
