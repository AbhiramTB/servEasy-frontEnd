import axios from "axios";
import { URL, adminRoutes, apiEndPointAdmin, routes } from "./constant";

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true, 
});

axiosInstance.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("adminToken");

  if (adminToken) {
    config.headers["Authorization"] = `Bearer ${adminToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error("Network error or server is unreachable", error);
      return Promise.reject({ message: "Network error", error });
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        console.warn("Access token expired, attempting refresh...");

        const response = await axios.post(
          `${URL}${apiEndPointAdmin.adminRefreshToken}`, // admin/refresh-token
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;

        localStorage.setItem("adminToken", newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);

        localStorage.removeItem("adminToken"); 
        window.location.href = adminRoutes.AdminSignIn; 

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


export const adminPostRequest = async (url: string, data: any) => {
    try {
      const response = await axiosInstance.post(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  // GET request
  export const adminGetRequest = async (url: string) => {
    try {
      const response = await axiosInstance.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  // PUT request
  export const adminPutRequest = async (url: string, data: any) => {
    try {
      const response = await axiosInstance.put(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  export const adminPatchRequest = async (url: string, data: any) => {
    try {
      const response = await axiosInstance.patch(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  
  // DELETE request
  export const adminDeleteRequest = async (url: string) => {
    try {
      const response = await axiosInstance.delete(url);
      return response;
    } catch (error) {
      throw error;
    }
  };