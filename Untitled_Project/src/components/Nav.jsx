import React, { useState } from 'react';
import styles from './Nav.module.css';
import PopupMenu from './PopupMenu';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';

function Nav({ isLoggedIn, handleLog, handleLogout, menuOpen, handleClick }) {
  const [popupOpen, setPopupOpen] = useState(false);  

  const popup = () => {
    setPopupOpen(!popupOpen);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: .5 }}
      className={styles.container}
    >
      <div className={styles.linkcontainer}>
        <a onClick={popup}>SignUp / Login</a>
        <Link to="/leaderboards">Leaderboards</Link>
        <Link to="/">Melody Mystery</Link>
        <Link to="/about">About</Link>
      </div>
      <div className={styles.termscontainer}>
        <Link to="/terms">Terms and Conditions</Link>
        <p>|</p>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
      {popupOpen && <PopupMenu close={handleClick} handleLog={handleLog}/>}
    </motion.div>
  );
}

export default Nav;
