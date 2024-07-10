// src/services/movie/fetchMovieDetail.tsx

import axios from 'axios';
import apiClient from '../client/apiClient.tsx';
import { getLocalRefreshToken, logout} from '../auth/authService.tsx';


export type responseMovieDetailType = MovieDetailType;


export const fetchMovieDetail = async (itemId: number): Promise<responseMovieDetailType> => {
    try {
        const response = await apiClient.get<responseMovieDetailType>(`/movie/detail/${itemId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
            // Обновление токена при истечении срока действия
            const refreshToken = getLocalRefreshToken();
            if (refreshToken) {
                try {
                    const response = await apiClient.post('/user/refresh/', { refresh: refreshToken });
                    localStorage.setItem('accessToken', response.data.access);
                    // Повторный запрос с новым Access токеном
                    return await fetchMovieDetail(itemId);
                } catch (error) {
                    console.error("Token Update Error", error);
                    await logout();
                }
            } else {
                await logout();
            }
        }
        throw error;
    }
};
