import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import styles from './TermsPriv.module.css';
import { useAuth } from '../../AuthContext';
import { motion } from 'framer-motion';

// Leaderboard component displays the top scores and the user's score
export default function TermsPriv() {

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <h1 className={styles.title}>Terms and Privacy</h1>
                <div className={styles.termcontainer}>
                    <p className={styles.termsdesc}>We will update terms and conditions here as we grow. As of this posting we have the following terms and conditions:</p>
                    <li className={styles.listheader}>1. Usage</li>
                    <p className={styles.termsdesc}>By using this website, you agree to use it responsibly and lawfully.</p>

                    <li className={styles.listheader}>2. Privacy</li>
                    <p className={styles.termsdesc}>We respect your privacy and rest assured we will never share your personal information with anyone.</p>

                    <li className={styles.listheader}>3. Content</li>
                    <p className={styles.termsdesc}>All content on this website is provided for informational purposes only and is not guaranteed to be accurate or complete.</p>

                    <li className={styles.listheader}>4. Liability</li>
                   <p className={styles.termsdesc}> We are not liable for any damages or losses resulting from the use of this website.</p>

                    <li className={styles.listheader}>5. Changes</li>
                    <p className={styles.termsdesc}>We may update these guidelines occasionally. Please check back periodically for changes.</p>

                    <li className={styles.listheader}>Contact Information</li>
                    <p className={styles.termsdesc}>For any questions or concerns, please contact us.</p>


                </div>
            </div>
            <Footer />
        </div>
    );
}
