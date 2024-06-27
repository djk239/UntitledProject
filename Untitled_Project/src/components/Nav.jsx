import React, { useState } from 'react';
import styles from './Nav.module.css';
import PopupMenu from './PopupMenu';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Nav() {
  const [popupOpen, setPopupOpen] = useState(false);  
  const { isLoggedIn, handleLog, handleLogout } = useAuth();

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
        <motion.p className={styles.links} whileTap={{scale: 0.8}} whileHover={{scale: 1.25}} onClick={popup}>SignUp / Login</motion.p>
        <motion.div whileTap={{scale: 0.8}} whileHover={{scale: 1.2}}>
          <Link className={styles.links} to="/leaderboards">Leaderboards</Link>
        </motion.div>
        <motion.div whileTap={{scale: 0.8}} whileHover={{scale: 1.15}}>
          <Link className={styles.links} to="/">Melody Mystery</Link>
        </motion.div>
        <motion.div whileTap={{scale: 0.8}} whileHover={{scale: 1.15}}>
          <Link className={styles.links} to="/about">About</Link>
        </motion.div>
      </div>
      <div className={styles.termscontainer}>
        <Link className={styles.terms} to="/terms">Terms and Conditions</Link>
        <p className={styles.terms}>|</p>
        <Link className={styles.terms} to="/privacy">Privacy Policy</Link>
      </div>
      {popupOpen && <PopupMenu close={handleClick} handleLog={handleLog}/>}
    </motion.div>
  );
}

export default Nav;
