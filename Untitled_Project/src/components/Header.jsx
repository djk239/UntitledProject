import React, { Component } from 'react';
import Nav from './Nav';
import styles from './Header.module.css';

class Header extends Component {
  render() {
    const { isLoggedIn, handleLog, handleLogout } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.bg}>
          <Nav isLoggedIn={isLoggedIn} handleLog={handleLog} handleLogout={handleLogout} /> {/* Ensure handleLogout is passed down */}
        </div>
      </div>
    );
  }
}

export default Header;
