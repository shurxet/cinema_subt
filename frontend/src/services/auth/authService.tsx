// src/services/auth/authService.tsx

import apiClient from "../client/apiClient.tsx";
import axios from "axios";
import {responseUserProfileType} from "../user/fetchUserProfile.tsx";


export const signUp = async (
    username: string,
    email: string,
    phone: string,
    password: string,
    password_repeat: string
) => {
    try {
        const response = await apiClient.post(
            '/user/signup', {
                username,
                email,
                phone,
                password,
                password_repeat
            });
        if (response.data.username) {
            await signIn(username, password);
            console.log('Успешная регистрация');
        }
        return response.data;
    } catch (error) {
        console.error("Login Error", error);
        throw error;
    }
};


export const signIn = async (username: string, password: string) => {
    try {
        const response = await apiClient.post('/user/login', { username, password });
        console.log('Login Response:', response.data);
        // return response.data;
        await pairTokens(username, password);

    } catch (error) {

        console.error("Login Error", error);
        throw error;
    }
};


export const pairTokens = async (username: string, password: string) => {
    try {
        const response = await apiClient.post('/user/token/', {username, password});
        if (response.data.access && response.data.refresh) {
            // Сохранение токенов в localStorage
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
        }
        return response.data;
    } catch (error) {
        console.error("Login Error", error);
        throw error;
    }

};


export const logout = async () => {
  console.log('accessToken', localStorage.getItem('accessToken'));
  console.log('refreshToken', localStorage.getItem('refreshToken'));

  const refreshToken = localStorage.getItem('refreshToken');

  if (refreshToken) {
    try {
      // Проверка срока действия refresh токена
      const response = await apiClient.post('/user/verify/', { token: refreshToken });
      if (response.status === 200) {
        // Выполнение запроса на удаление сессии пользователя, если токен действителен
        await apiClient.delete('/user/profile');
        console.log('Refresh токен активен, выполнение выхода с проверкой access токена.');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        console.warn('Refresh токен просрочен, выполнение выхода без удаления сессии на сервере.');
      } else {
        console.error('Произошла ошибка при проверке токена или выходе из системы:', error);
      }
    }
  } else {
    console.warn('Refresh токен отсутствует, выполнение выхода без проверки access токена.');
  }

  // Удаление токенов из localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  // Удаление CSRF токена из cookie
  document.cookie = 'csrftoken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

  // Перенаправление на главную страницу после выполнения всех операций
  window.location.href = '/';
};


export const getLocalAccessToken = () => {
    return localStorage.getItem('accessToken');
};


export const getLocalRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};


export const updateAccessToken = async (): Promise<boolean> => {
    const refreshToken = getLocalRefreshToken();
    if (refreshToken) {
        const isRefreshTokenValid = await verifyToken(refreshToken);
        if (!isRefreshTokenValid) {
            await logout();
            return false;
        }

        try {
            const response = await apiClient.post('/user/refresh/', { refresh: refreshToken });
            localStorage.setItem('accessToken', response.data.access);
            return true;
        } catch (error) {
            console.error('Token Update Error', error);
            await logout();
            return false;
        }
    } else {
        await logout();
        return false;
    }
};


export const handleTokenRefreshAndRetry = async (fn: () => Promise<responseUserProfileType>): Promise<responseUserProfileType> => {
    const tokenRefreshed = await updateAccessToken();
    if (tokenRefreshed) {
        return await fn();  // Повторный вызов функции с новым токеном
    } else {
        throw new Error('Unable to refresh token');
    }
};


export const verifyToken = async (token: string): Promise<boolean> => {
    try {
        await apiClient.post('/user/verify/', { token });
        return true;
    } catch (error) {
        return false;
    }
};
