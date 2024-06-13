import React, { useState } from 'react';
import Nav from './Nav';
import styles from './Header.module.css';
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ isLoggedIn, handleLog, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <h1 className={styles.title}>Melody Mystery</h1>
      <div className={styles.container}>
        <motion.div
          className={styles.hamburger}
          onClick={handleClick}
          initial={false}
          animate={menuOpen ? "open" : "closed"}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.rect
              width="24"
              height="2"
              rx="1"
              fill="#ddcecd"
              variants={{
                closed: { y: 4, rotate: 0 },
                open: { y: 12, rotate: 45 }
              }}
              transition={{ duration: 0.2 }}
              style={{ filter: 'drop-shadow(2px 2px 2px rgba(0, 2, 5, 0.3))' }}
            />
            <motion.rect
              width="24"
              height="2"
              rx="1"
              fill="#ddcecd"
              variants={{
                closed: { y: 11, opacity: 1 },
                open: { opacity: 0 }
              }}
              transition={{ duration: 0.2 }}
              style={{ filter: 'drop-shadow(2px 2px 2px rgba(0, 2, 5, 0.3))' }}
            />
            <motion.rect
              width="24"
              height="2"
              rx="1"
              fill="#ddcecd"
              variants={{
                closed: { y: 18, rotate: 0 },
                open: { y: 12, rotate: -45 }
              }}
              transition={{ duration: 0.2 }}
              style={{ filter: 'drop-shadow(2px 2px 2px rgba(0, 2, 5, 0.3))' }}
            />
          </svg>
        </motion.div>
      </div>
        <div className={styles.bar} />
        <div className={styles.bottom}/>
      <AnimatePresence>
        {menuOpen && <Nav isLoggedIn={isLoggedIn} handleLog={handleLog} handleLogout={handleLogout} menuOpen={menuOpen} handleClick={handleClick} />}
      </AnimatePresence>
    </>
  );
};

export default Header;
