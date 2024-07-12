import { useState } from "react";
import DOMPurify from 'dompurify';
import styles from "./PopupMenu.module.css";
import { login, signup } from "../api";
import { motion } from "framer-motion";
import { useFormik } from 'formik';
import { signupSchema } from "../schema/SignupSchema";
import { loginSchema } from "../schema/LoginSchema";
import { useAuth } from "../AuthContext";

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

function PopupMenu({close}) {
    const [isLoggingin, setisLoggingin] = useState(true);
    const { handleLog } = useAuth();
    const [loginError, setLoginError] = useState("");

    const sanitizeInput = (input) => DOMPurify.sanitize(input);

    const loginFormik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            const sanitizedValues = {
                username: sanitizeInput(values.username),
                password: sanitizeInput(values.password),
            };
            try {
                const response = await login(sanitizedValues);
                console.log("Login successful:", response);
                closeMenu();
                handleLog();
            } catch (error) {
                console.log("Login error:", error);
                setLoginError("Credentials do not match. Please try again.");
            }
        },
    });

    const signupFormik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: signupSchema,
        onSubmit: async (values) => {
            const sanitizedValues = {
                email: sanitizeInput(values.email),
                username: sanitizeInput(values.username),
                password: sanitizeInput(values.password),
                confirmPassword: sanitizeInput(values.confirmPassword),
            };
            try {
                const response = await signup(sanitizedValues);
                console.log("Signup successful:", response);
                closeMenu();
            } catch (error) {
                console.log("Signup error:", error);
            }
        },
    });

    const switchMode = () => {
        setisLoggingin(!isLoggingin);
        setLoginError("");
    };

    const closeMenu = () => {
        close();
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
            <form onSubmit={isLoggingin ? loginFormik.handleSubmit : signupFormik.handleSubmit}>
                {isLoggingin ? (
                    <div>
                        <h2 className={styles.head}>Login</h2>
                        <ul className={styles.loginlist}>
                            <li>
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={loginFormik.values.username}
                                    onChange={loginFormik.handleChange}
                                    onBlur={loginFormik.handleBlur}
                                    className={`${styles.input} ${loginFormik.errors.username && loginFormik.touched.username ? styles.inputError : ''}`}
                                />
                                {loginFormik.errors.username && loginFormik.touched.username && <p className={styles.error}>{loginFormik.errors.username}</p>}

                            </li>
                            <li>
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={loginFormik.values.password}
                                    onChange={loginFormik.handleChange}
                                    onBlur={loginFormik.handleBlur}
                                    className={`${styles.input} ${loginFormik.errors.password && loginFormik.touched.password ? styles.inputError : ''}`}
                                />
                                {loginFormik.errors.password && loginFormik.touched.password && <p className={styles.error}>{loginFormik.errors.password}</p>}
                                {loginError && <p className={styles.error}>{loginError}</p>}
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div>
                        <h2 className={styles.head}>Sign-Up</h2>
                        <ul className={styles.signuplist}>
                            <li>
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={signupFormik.values.email}
                                    onChange={signupFormik.handleChange}
                                    onBlur={signupFormik.handleBlur}
                                    className={`${styles.input} ${signupFormik.errors.email && signupFormik.touched.email ? styles.inputError : ''}`}
                                />
                                {signupFormik.errors.email && signupFormik.touched.email && <p className={styles.error}>{signupFormik.errors.email}</p>}
                            </li>
                            <li>
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={signupFormik.values.username}
                                    onChange={signupFormik.handleChange}
                                    onBlur={signupFormik.handleBlur}
                                    className={`${styles.input} ${signupFormik.errors.username && signupFormik.touched.username ? styles.inputError : ''}`}
                                />
                                {signupFormik.errors.username && signupFormik.touched.username && <p className={styles.error}>{signupFormik.errors.username}</p>}
                            </li>
                            <li>
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={signupFormik.values.password}
                                    onChange={signupFormik.handleChange}
                                    onBlur={signupFormik.handleBlur}
                                    className={`${styles.input} ${signupFormik.errors.password && signupFormik.touched.password ? styles.inputError : ''}`}
                                />
                                {signupFormik.errors.password && signupFormik.touched.password && <p className={styles.error}>{signupFormik.errors.password}</p>}
                            </li>
                            <li>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    value={signupFormik.values.confirmPassword}
                                    onChange={signupFormik.handleChange}
                                    onBlur={signupFormik.handleBlur}
                                    className={`${styles.input} ${signupFormik.errors.confirmPassword && signupFormik.touched.confirmPassword ? styles.inputError : ''}`}
                                />
                                {signupFormik.errors.confirmPassword && signupFormik.touched.confirmPassword && <p className={styles.error}>{signupFormik.errors.confirmPassword}</p>}
                            </li>
                        </ul>
                    </div>
                )}
                <div className={styles.btnwrap}>
                    <motion.button type="submit" className={styles.btn} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{isLoggingin ? "Login" : "Sign Up"}</motion.button>
                    <motion.button type="button" className={styles.btn} onClick={switchMode} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Switch</motion.button>
                </div>
            </form>
        </motion.div>
    );
}

export default PopupMenu;
