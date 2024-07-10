// src/services/user/fetchUserProfile.tsx

import {AxiosError} from 'axios';
import apiClient from '../client/apiClient.tsx';
import {
    getLocalAccessToken,
    handleTokenRefreshAndRetry,
    logout,
    verifyToken
} from '../auth/authService.tsx';
import {handleApiErrors} from "../client/apiErrors.tsx";


export type responseUserProfileType = UserProfileType;


export const getUserProfile = async (): Promise<UserProfileType> => {
    const accessToken = getLocalAccessToken();

    if (!accessToken) {
        await logout();
        throw new Error('No access token found');
    }

    const isTokenValid = await verifyToken(accessToken);
    if (!isTokenValid) {
        return await handleTokenRefreshAndRetry(getUserProfile);
    }

    try {
        const response = await apiClient.get<responseUserProfileType>('/user/profile');
        return response.data;
    } catch (error) {
        return await handleApiErrors(error as AxiosError, getUserProfile);
    }
};


export const updateUserProfilePhoto = async (file: File): Promise<UserProfileType> => {
    const formData = new FormData();
    formData.append('image', file);
    try {
        const response = await apiClient.patch<responseUserProfileType>(
            '/user/profile',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    } catch (error) {
        return await handleApiErrors(error as AxiosError, () => updateUserProfilePhoto(file));
    }
};


export const updateUserProfileData = async (data: UserProfileType, image: File | null): Promise<UserProfileType> => {
    try {
        const formData = new FormData();

        formData.append('username', data.username);

        if (data.first_name) formData.append('first_name', data.first_name);
        if (data.last_name) formData.append('last_name', data.last_name);
        if (data.age) formData.append('age', String(data.age));
        if (data.email) formData.append('email', data.email);
        if (data.phone) formData.append('phone', data.phone);
        if (image) formData.append('image', image);


        const response = await apiClient.patch<responseUserProfileType>(
            '/user/profile',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return response.data;
    } catch (error) {
         return await handleApiErrors(error as AxiosError, () => updateUserProfileData(data, image));
    }
};
