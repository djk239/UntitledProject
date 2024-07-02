import React from 'react';
import './homestyle.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container">
      <div className="navbar">
        <div className="transparentlogo">
          <img src="./public/images/logo2.png" className="logo" alt="Logo" />
        </div>
        <nav>
          <ul>
          <Link to={'/melodymystery'}>
          <li><button type="button" className="topbutton">Melody Mystery</button></li>
          </Link>
          <Link to={'/about'}>
            <li><button type="button" className="topbutton">About Us</button></li>
          </Link>
          <Link to={'/leaderboards'}>
            <li><button type="button" className="topbutton">More Things</button></li>
          </Link>
          </ul>
        </nav>
      </div>
      <div className="row">
        <div className="col">
          <h1 className="main-title-header">Melody Mystery</h1>
          <p>Welcome to Melody Mystery, the ultimate music guessing game! Test your music knowledge and see how well you know your favorite tunes. In this thrilling game, you'll be presented with short clips from a wide variety of songs. Your challenge is to guess the song title and artist as quickly as possible. The faster you guess correctly, the higher your score!</p>
          <button type="button" className="button">Sign In</button>
        </div>
        <div className="col">
          <Link to={'/melodymystery'} className="card card1 transparent1">
            <h5>Play Game</h5>
          </Link>
          <div className="card card2 transparent2">
            <h5>Coming Soon</h5>
          </div>
          <div className="card card3 transparent3">
            <h5>Coming Soon</h5>
          </div>
          <div className="card card4 transparent4">
            <h5>Coming Soon</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
