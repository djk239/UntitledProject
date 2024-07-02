import React from 'react';
import './aboutus.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="container">
      <div className="heading">
        <h1>About Us</h1>
        <p>.Non quia facilis est, sed quia hard.</p>
      </div>
      <section className="about">
        <div className="about-image">
          <img src="./public/images/cartoonguys.png" alt="Image" />
        </div>
        <div className="about-content">
          {/* Additional content goes here */}
          <h2>Welcome User</h2>
          <p>This is the story...</p>
          <Link to={'/'} className="homelink">Home</Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
