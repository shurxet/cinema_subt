// src/components/pages/login_page/LoginComponent.tsx

import React, { useState } from 'react';
import {signIn} from '../../../../services/auth/authService.tsx';
import styles from "./css/LoginPageMain.module.css";


interface LoginFormComponentProps {
    onClose: () => void;
}

const LoginFormComponent: React.FC<LoginFormComponentProps> = ({ onClose }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);


    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await signIn(username, password);
            // Перенаправление или выполнение других действий после успешного логина
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
                <form className={styles.form} onSubmit={handleLogin}>
                    <h2 className={styles.title}>Login</h2>
                    <div className={styles.inputGroup}>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <button className={styles.loginButton} type="submit">Login</button>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginFormComponent;