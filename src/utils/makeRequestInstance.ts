import axiosInstance from "./AxiosInstance";

// POST request
export const postRequest = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

// GET request
export const getRequest = async (url: string, params?: object) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response;
  } catch (error) {
    throw error;
  }
}

// PUT request
export const putRequest = async (url: string, data: any) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

// DELETE request
export const deleteRequest = async (url: string) => {
  try {
    const response = await axiosInstance.delete(url);
    return response;
  } catch (error) {
    throw error;
  }
};
