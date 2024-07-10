// src/pages/MovieDetailPage.tsx

import styles from "./main.module.css";
import {ReactNode, useState} from "react";
import {useAuth} from "./context/useAuth.tsx";
import useUpdateUserProfile from "./hooks/userHooks/useUpdateUserProfile.tsx";
import {logout} from "./services/auth/authService.tsx";
import HeaderComponent from "./components/common/Header/HeaderComponent.tsx";
import LoginSignUpFormsComponent from "./components/common/forms/LoginSignUpFormsComponent.tsx";


interface AppProps {
  children: ReactNode;
}

function App({ children }: AppProps) {
    const { accessToken } = useAuth();
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { userProfile, handleUploadPhoto } = useUpdateUserProfile();


   const handleLoginButtonClick = () => {
        setShowLoginForm(true); // Показать LoginPageComponent при нажатии на кнопку "Login"
    };

    const handleLogoutButtonClick = async () => {
        await logout()
    };

    const handleSignUpButtonClick = () => {
        setShowSignUpForm(true);
    }

    const handleCloseLogin = () => {
        setShowLoginForm(false); // Закрыть LoginPageComponent
    };

    const handleCloseSignUp = () => {
        setShowSignUpForm(false); // Закрыть SignUpPageComponent
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu((prev) => !prev);
    };

    return (
        <div className={styles.wrapper}>
            <HeaderComponent
                accessToken={accessToken}
                userProfile={userProfile}
                onLoginClick={handleLoginButtonClick}
                onLogoutClick={handleLogoutButtonClick}
                onSignUpClick={handleSignUpButtonClick}
                showProfileMenu={showProfileMenu}
                toggleProfileMenu={toggleProfileMenu}
                handleUploadPhoto={handleUploadPhoto}
            />
            <div className={styles.container}>
                {children}
            </div>
            <LoginSignUpFormsComponent
                showLoginForm={showLoginForm}
                showSignUpForm={showSignUpForm}
                handleCloseLogin={handleCloseLogin}
                handleCloseSignUp={handleCloseSignUp}
            />
        </div>
    )
}

export default App;
