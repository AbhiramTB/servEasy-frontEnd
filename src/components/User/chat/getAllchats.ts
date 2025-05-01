import { apiEndPoint } from "../../../utils/constant"
import { getRequest, postRequest } from "../../../utils/makeRequestInstance"

export const getAllchats =async (sender:string,reciver:string) => {
  try {
    return  await postRequest(apiEndPoint.getSpecificChat,{sender,reciver})
        
} catch (error) {
     return error
  }
}

 
export const getProfile=async (id:string)=>{
    try {
        return  await getRequest(apiEndPoint.getUserChat+""+id)
                  
    } catch (error) {
         return error
      }
}