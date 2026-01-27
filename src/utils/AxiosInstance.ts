import axios from 'axios';
import { apiEndPoint, routes } from './constant';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error('Network error or server is unreachable', error);
      return Promise.reject({ message: 'Network error', error });
    }

    if (error.response.status === 403 && error.response.data?.message?.toLowerCase()?.includes('blocked')) {
      console.warn('User is blocked. Logging out...');
      localStorage.removeItem('accessToken');
      window.location.href = `${routes.siginSignup}?blocked=true`;
      return;
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.error('Network error or server is unreachable', error);

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}${apiEndPoint.refreshToken}`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);

        localStorage.removeItem('accessToken');
        window.location.href = routes.siginSignup;

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
