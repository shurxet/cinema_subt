// src/services/movie/fetchMovieList.tsx

import axios from 'axios';
import apiClient from '../client/apiClient.tsx';
import { getLocalRefreshToken, logout} from '../auth/authService.tsx';


export type responseMovieListType = MovieListType[];


export const fetchMovieList = async (): Promise<responseMovieListType> => {
    try {
        const response = await apiClient.get<responseMovieListType>('/movie/list/');
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
                    return await fetchMovieList();
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
