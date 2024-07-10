import {useEffect, useState} from "react";
import {getUserProfile} from "../../services/user/fetchUserProfile.tsx";
import {useAuth} from "../../context/useAuth.tsx";


export const useUserProfile = () => {
    const { accessToken } = useAuth();
    const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
    const [err, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            if (accessToken) {
                try {
                    const profileData = await getUserProfile();
                    setUserProfile(profileData);
                } catch (error) {
                    // Проверка типа ошибки
                    if (error instanceof Error) {
                        console.error('Error fetching user profile:', error.message);
                        setError('Failed to fetch user profile.');
                    } else {
                        console.error('Unexpected error fetching user profile');
                        setError('Unexpected error fetching user profile.');
                    }
                }
            }
        })()
    }, [accessToken]);

    return { userProfile, setUserProfile, err};
};
