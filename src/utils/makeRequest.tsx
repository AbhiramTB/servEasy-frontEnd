import axios, { AxiosError } from "axios";
import { URL } from "./constant";
export const makeRequest   = async(
  endPoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: object | string
):Promise<any> => {
 
try {
    const config:{
     method: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
    data?: object | string;
    }={
        method,
         url:`${URL}${endPoint}`,
        
    }

   if(data &&(method=="POST" || method == "PUT")){
     config.data=data;
   }
    const response = await axios(config) 
    return response 

} catch (error) {
    console.log('axios error');
    
    throw error as AxiosError
 
    
}

};
