import axios from 'axios';
import { useAuthStore } from '@_store/authStore';

export const instance = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await instance.post('/jwt/reissue', null);

        const raw = res.headers['authorization'];
        const newToken = raw?.startsWith('Bearer ') ? raw.slice(7) : raw;

        if (!newToken) throw new Error('토큰 재발급 실패');

        const payload = JSON.parse(atob(newToken.split('.')[1]));
        const memberId = Number(payload.id);

        useAuthStore.getState().setAuth(newToken, memberId);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (reissueError) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(reissueError);
      }
    }

    return Promise.reject(error);
  },
);
