import React, { Component } from 'react'
import styles from './Footer.module.css'
import { Link } from 'react-router-dom'

// URLS to social media accounts
const instaUrl = "https://www.instagram.com/melody_mystery_/"
const xUrl = "https://twitter.com/melody_mystery_"

export class Footer extends Component {


  render() {
    return (
      <div className={styles.container}>
          <h3 className={styles.title}>Melody Mystery 2024</h3>
          <Link to={instaUrl} target='_blank'>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="instagram"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="40" fill="none" stroke="#ddcecd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"></circle><rect width="184" height="184" x="36" y="36" fill="none" stroke="#ddcecd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" rx="48"></rect><circle cx="180" cy="76" r="10"></circle></svg>
          </Link>
          <Link to={xUrl} target='_blank'>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 1668.56 1221.19" viewBox="0 0 1668.56 1221.19" id="twitter-x"><path d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99
      h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z" transform="translate(52.39 -25.059)"></path></svg>
         </Link>
          <div className={styles.linkcontainer}>
            <Link className={styles.link} to='/terms'>Terms</Link>
            <Link className={styles.link} to='/privacy'>Privacy</Link>
            <Link className={styles.link} to='/about'>Contact</Link>
          </div>
        </div>
    )
  }
}

export default Footer
