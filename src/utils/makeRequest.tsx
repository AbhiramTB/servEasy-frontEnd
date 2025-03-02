import axios, { AxiosError } from "axios";
import { URL } from "./constant";

export const makeRequest = async (
  endPoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: object | string
): Promise<any> => {
  try {
    const config = {
      method,
      url: `${URL}${endPoint}`,
      withCredentials: true, // ✅ Ensures cookies (refreshToken) are sent
    } as any; // ✅ Type assertion to allow optional properties

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
