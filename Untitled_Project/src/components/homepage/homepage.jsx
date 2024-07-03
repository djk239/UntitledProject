import React from 'react';
import './homestyle.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className= {styles.container}>
      <div className= {styles.navbar}>
        <div className= {styles.transparentlogo}>
          <img src="./public/images/logo2.png" className= {styles.logo} alt="Logo" />
        </div>
        <nav>
          <ul>
          <Link to={'/melodymystery'}>
          <li><button type="button" className= {styles.topbutton}>Melody Mystery</button></li>
          </Link>
          <Link to={'/about'}>
            <li><button type="button" className= {styles.topbutton}>About Us</button></li>
          </Link>
          <Link to={'/leaderboards'}>
            <li><button type="button" className= {styles.topbutton}>More Things</button></li>
          </Link>
          </ul>
        </nav>
      </div>
      <div className= {styles.row}>
        <div className= {styles.col}>
          <h1 className= {styles.main-title-header}>Melody Mystery</h1>
          <p>Welcome to Melody Mystery, the ultimate music guessing game! Test your music knowledge and see how well you know your favorite tunes. In this thrilling game, you'll be presented with short clips from a wide variety of songs. Your challenge is to guess the song title and artist as quickly as possible. The faster you guess correctly, the higher your score!</p>
          <button type="button" className= {styles.button}>Sign In</button>
        </div>
        <div className="col">
          <Link to={'/melodymystery'} className= {`${styles.card} ${styles.card1} ${styles.transparent1}`}>
            <h5>Play Game</h5>
          </Link>
          <div className= {`${styles.card} ${styles.card2} ${styles.transparent2}`}>
            <h5>Coming Soon</h5>
          </div>
          <div className={`${styles.card} ${styles.card3} ${styles.transparent3}`}>
            <h5>Coming Soon</h5>
          </div>
          <div className={`${styles.card} ${styles.card4} ${styles.transparent4}`}>
            <h5>Coming Soon</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
