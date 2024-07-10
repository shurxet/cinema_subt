import React from 'react';
import styles from './css/User.module.css';
import UserDetails from './UserDetails';
import UserSubscriptions from './UserSubscriptions.tsx';
import {useUserProfile} from "../../hooks/userHooks/useUserProfile.tsx";


const UserProfile: React.FC = () => {
    const { userProfile } = useUserProfile();
    return (
        <div className={styles.user_profile}>
            <UserDetails response={userProfile}/>
            <UserSubscriptions/>
        </div>
    );
};

export default UserProfile;

