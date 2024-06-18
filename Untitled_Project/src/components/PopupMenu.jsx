import { useState } from "react";
import styles from "./PopupMenu.module.css";
import { login, signup } from "../api";
import { motion } from "framer-motion";

const popupVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        rotate: -10,
        y: 50,
    },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        rotate: 10,
        y: 50,
        transition: {
            duration: 0.4,
            ease: "easeIn",
        },
    },
};

const formTransition = {
    type: "tween",
    duration: 0.6,
    ease: "easeInOut",
};

function PopupMenu({ close, handleLog }) {
    const [isLoggingin, setisLoggingin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const switchMode = () => {
        setisLoggingin(!isLoggingin);
    };

    const closeMenu = () => {
        close();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ username, password });
            console.log("Login successful:", response);
            closeMenu();
            handleLog();
        } catch (error) {
            console.log("Login error:", error);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await signup({ username, email, password });
            console.log("Signup successful:", response);
            closeMenu();
        } catch (error) {
            console.log("Signup error:", error);
        }
    };

    return (
        <motion.div
            className={`${styles.container} ${isLoggingin ? styles.login : styles.signup}`}
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            transition={formTransition}
        >
            <form onSubmit={isLoggingin ? handleLogin : handleSignup}>
                {isLoggingin ? (
                    <div>
                        <h2 className={styles.head}>Login</h2>
                        <ul className={styles.loginlist}>
                            <li>
                                <label htmlFor="usernameL">Username</label>
                                <input id="usernameL" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="passwordL">Password</label>
                                <input id="passwordL" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div>
                        <h2 className={styles.head}>Sign-Up</h2>
                        <ul className={styles.signuplist}>
                            <li>
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="usernameS">Username</label>
                                <input id="usernameS" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </li>
                            <li>
                                <label htmlFor="passwordS">Password</label>
                                <input id="passwordS" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </li>
                        </ul>
                    </div>
                )}
                <div className={styles.btnwrap}>
                    <button type="submit" className={styles.btn}>{isLoggingin ? "Login" : "Sign Up"}</button>
                    <button type="button" className={styles.btn} onClick={switchMode}>Switch</button>
                </div>
            </form>
        </motion.div>
    );
}

export default PopupMenu;
