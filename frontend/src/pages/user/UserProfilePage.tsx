import styles from './css/UserProfilePage.module.css';
import UserProfile from '../../components/user/UserProfile';
import {useAuth} from "../../context/useAuth.tsx";

function UserProfilePage() {
    const { accessToken } = useAuth();

    return (
        <div className={styles.UserProfilePage}>
            {accessToken ? (
                <UserProfile />
                ) : (<div>User must be authorized!</div>)
            }
        </div>
    );
}

export default UserProfilePage;
