import React, { useState } from 'react';
import styles from './Nav.module.css';
import PopupMenu from './PopupMenu';
import { motion, AnimatePresence } from "framer-motion";

function Nav({ isLoggedIn, handleLog, handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>UntitledProject</h1>
      {isLoggedIn ? (
        <motion.button className={styles.logoutButton} onClick={handleLogout} whileTap={{ scale: 0.92 }} whileHover={{ scale: 1.02 }}>Logout</motion.button>
      ) : (
        <motion.div
          className={styles.hamburger}
          onClick={handleClick}
          initial={false}
          animate={menuOpen ? "open" : "closed"}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.rect
              width="24"
              height="2"
              rx="1"
              fill="white"
              variants={{
                closed: { y: 4, rotate: 0 },
                open: { y: 12, rotate: 45 }
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.rect
              width="24"
              height="2"
              rx="1"
              fill="white"
              variants={{
                closed: { y: 11, opacity: 1 },
                open: { opacity: 0 }
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.rect
              width="24"
              height="2"
              rx="1"
              fill="white"
              variants={{
                closed: { y: 18, rotate: 0 },
                open: { y: 12, rotate: -45 }
              }}
              transition={{ duration: 0.2 }}
            />
          </svg>
        </motion.div>
      )}
      <AnimatePresence>
        {menuOpen && <PopupMenu close={handleClick} handleLog={handleLog} />}
      </AnimatePresence>
    </div>
  );
}

export default Nav;
