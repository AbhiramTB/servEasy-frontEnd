import axios from "axios";

import { URL, apiEndPoint, routes } from "./constant";

const axiosInstance = axios.create({
  baseURL: URL,

  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${URL}${apiEndPoint.refreshToken}`,

          {},

          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers["Authorization"] =
          `Bearer ${newAccessToken}`;

        return axios(originalRequest);
      } catch (error) {
        console.error(error);

        localStorage.removeItem("accessToken");

        window.location.href = routes.siginSignup;
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
