import React from 'react';
import HomeNav from './homenav';
import styles from './homepage.module.css';
import Homegamecard from './homegamecard';

const HomePage = () => {
  return (
    <div className= {styles.App}>

    {/* <div className= {styles.container}>
        <div className= {styles.transparentlogo}>
          <img src="./images/logo2.png" className= {styles.logo} alt="Logo" />
        </div>
    </div> */}
      <div className= {styles.navbar}>
        <div>
          <HomeNav />
        </div>
      </div>

      <div className= {styles.content}>

      <div className= {styles.row}>
        <div className= {styles.col}>
          <h1 className= {styles.maintitleheader}>Melody Mystery</h1>
          <p className= {styles.mainparagraph}>Welcome to Melody Mystery, the ultimate music guessing game! Test your music knowledge and see how well you know your favorite tunes. In this thrilling game, you'll be presented with short clips from a wide variety of songs. Your challenge is to guess the song title and artist as quickly as possible. The faster you guess correctly, the higher your score!</p>
          <button type="button" className= {styles.button}>Sign In</button>
        </div>
        
        <div>
          <Homegamecard />
        </div>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
