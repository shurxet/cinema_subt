// src/services/client/apiErrors.tsx

import axios, {AxiosError} from "axios";
import {handleTokenRefreshAndRetry} from "../auth/authService.tsx";
import {responseUserProfileType} from "../user/fetchUserProfile.tsx";


export const handleApiErrors = async (
    error: AxiosError,
    retryFunction: () => Promise<responseUserProfileType>,
): Promise<responseUserProfileType> => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const { status, data }: any = error.response;
            switch (status) {
                case 400:
                    console.error('Bad Request:', data);
                    throw { status, data };

                case 401:
                    // Если токен недействителен, обновляем токен и повторяем запрос
                    return handleTokenRefreshAndRetry(retryFunction);
                case 403:
                    console.error('Access forbidden:', data);
                    throw new Error('Access forbidden');
                case 500:
                    console.error('Server error:', data);
                    throw new Error('Server error');
                default:
                    console.error(`HTTP error: ${status}`, data);
                    throw new Error(`HTTP error: ${status}`);
            }
        } else {
            console.error('Network or other error:', error.message);
            throw new Error('Network error or no response received');
        }
    } else {
        console.error('Unexpected error:', error);
        throw new Error('Unexpected error occurred');
    }
};