// src/components/pages/login_page/LoginComponent.tsx

import React, { useState } from 'react';
import {signUp} from '../../../../services/auth/authService.tsx';
import styles from "./css/SignUpPageMain.module.css";


interface SignUpFormComponentProps {
    onClose: () => void;
}

const SignUpFormComponent: React.FC<SignUpFormComponentProps> = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [error, setError] = useState<string | null>(null);


    const handleSignup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await signUp(username, email, phone, password, passwordRepeat);
            // Перенаправление или выполнение других действий после успешной регистрации
            console.log('Успешный логин');
            window.location.href = '/';
        } catch (error) {
            setError('Login Error');
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalBackdrop} onClick={onClose}></div>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>✖</button>
                <form className={styles.form} onSubmit={handleSignup}>
                    <h2 className={styles.title}>SignUp</h2>
                    <div className={styles.inputGroup}>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Phone</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Password Repeat</label>
                        <input
                            type="password"
                            value={passwordRepeat}
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                        />
                    </div>
                    <button className={styles.loginButton} type="submit">SignUp</button>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default SignUpFormComponent;
