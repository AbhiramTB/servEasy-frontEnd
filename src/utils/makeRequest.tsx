import axios, { AxiosError } from "axios";

export const makeRequest = async (
  endPoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: object | string
): Promise<any> => {
  try {
    const config = {
      method,
      url: `${import.meta.env.VITE_BACKEND_URL}${endPoint}`,
      withCredentials: true, 
    } as any; 

    if (data && (method === "POST" || method === "PUT")) {
      config.data = data;
    }

    const response = await axios(config);
    return response;
  } catch (error) {
    console.log("Axios error:", error);
    throw error as AxiosError;
  }
};


