import React from "react";
import styles from './homenav.module.css';
import { Link } from "react-router-dom";

const HomeNav = () => {
    return(
        <nav>
        <ul>
        <Link to={'/melodymystery'}>
        <li><button type="button" className= {styles.topbutton}>Play Game</button></li>
        </Link>
        <Link to={'/about'}>
          <li><button type="button" className= {styles.topbutton}>About Us</button></li>
        </Link>
        <Link to={'/leaderboards'}>
          <li><button type="button" className= {styles.topbutton}>More Things</button></li>
        </Link>
        </ul>
      </nav>
    )
}
export default HomeNav;