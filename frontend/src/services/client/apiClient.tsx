// src/services/client.jsx

import axios from 'axios';
import { getLocalAccessToken } from '../auth/authService.tsx';


export const API_URL = import.meta.env.VITE_API_BASE_URL || `http://192.168.31.47/api`;
export const seriesPath = import.meta.env.VITE_SERIES_PATH || `/movie/load/`


const apiClient = axios.create({
    baseURL: API_URL,
    // withCredentials: true,  // Включает автоматическое отправление куки
    headers: {
        'Content-Type': 'application/json',
    },
});


apiClient.interceptors.request.use(
    (config) => {

        const accessToken = getLocalAccessToken();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        console.log('document.cookie csrfToken', document.cookie);
        console.log('config.headers.Authorization BearerTokens', config.headers.Authorization)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default apiClient;
