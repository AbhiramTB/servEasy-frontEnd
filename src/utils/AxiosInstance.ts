import axios from "axios";
import { URL, apiEndPoint, routes } from "./constant";

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true, // Allows cookies to be sent with requests
});

// Request Interceptor: Attach Access Token to Headers
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

// Response Interceptor: Handle Token Expiry & Refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ Ensure error.response exists before accessing status
    if (!error.response) {
      console.error("Network error or server is unreachable", error);
      return Promise.reject({ message: "Network error", error });
    }

    // ✅ Handle 401 (Unauthorized) errors and refresh token logic
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried to prevent infinite loop

      try {    console.error("Network error or server is unreachable", error);

        console.error("--------called refresh  route",);

        const response = await axios.post(
          `${URL}${apiEndPoint.refreshToken}`,
          {},
          { withCredentials: true } // Send HTTP-only cookie with refresh token
        );

        const newAccessToken = response.data.accessToken;

        // ✅ Store new access token in localStorage
        localStorage.setItem("accessToken", newAccessToken);

        // ✅ Retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);

        // ✅ If refresh fails, clear token and redirect to login
        localStorage.removeItem("accessToken");
        window.location.href = routes.siginSignup;

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
