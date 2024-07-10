import React from "react";
import {Link} from "react-router-dom";
import styles from "./css/Header.module.css";
import reactLogo from "../../../assets/react.svg";
import {HeaderProps} from "./HeaderProps.ts";


const HeaderComponent: React.FC<HeaderProps> = ({
  accessToken,
  userProfile,
  onLoginClick,
  onLogoutClick,
  onSignUpClick,
  showProfileMenu,
  toggleProfileMenu,
  handleUploadPhoto,
}) => {
  return (
    <header>
    <div className={styles.panel_container}>
      <div className={styles.logo_container}>
        <img src={reactLogo} className="" alt="" />
      </div>
      {accessToken ? (
        <div className={styles.button_container}>
          <div className={styles.username_container}>
            <h2>
              <div className={styles.username}>
                <div>
                  <span>{userProfile?.username}</span>
                </div>
                {/*<div>*/}
                {/*  <span>{userProfile?.email}</span>*/}
                {/*</div>*/}
              </div>
              <button className={styles.profile_menu_button} onClick={toggleProfileMenu}>▼</button>
            </h2>
            {showProfileMenu && (
                <div className={styles.profile_menu}>
                  <Link className={styles.profile_link} to={`/profile/`}>
                    Profile
                </Link>
                <label className={styles.upload_button}>Load photo<input type="file"
                  onChange={handleUploadPhoto}
                  style={{display: 'none'}}/></label>
                <button className={styles.logout_button} onClick={onLogoutClick}>Logout</button>
              </div>
            )}
          </div>
          <Link className={styles['link-avatar-wrapper']} to={`/profile/`}>
            <div className={styles['avatar-wrapper']}>
              <div className={styles['avatar-container']}>
                <div className={styles['avatar-img-container']}>
                  <img alt="" className={styles['avatar-img']} id="avatarImg" src={userProfile?.image ?? ''}/>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className={styles.button_container}>
          <button className={styles.login_button} onClick={onLoginClick}>Login</button>
          <button className={styles.login_button} onClick={onSignUpClick}>SignUp</button>
        </div>
      )}
    </div>
    </header>
  );
}

export default HeaderComponent;
