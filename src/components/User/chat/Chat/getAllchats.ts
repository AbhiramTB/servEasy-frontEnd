import { apiEndPoint } from "../../../../utils/constant"
import { getRequest, postRequest } from "../../../../utils/makeRequestInstance"

export const getAllchats =async (sender:string,reciver:string) => {
  try {
    return  await postRequest(apiEndPoint.getSpecificChat,{sender,reciver})
        
} catch (error) {
     return error
  }
}
export const getServiceProviderProfile=async (id:string)=>{
    try {
        return  await getRequest(apiEndPoint.getServiceProviderInfoChat+""+id)
                  
    } catch (error) {
         return error
      }
}
 


export const fetchAllChats= async (data:{serviceProviderId?:string ,userId?:string})=>{
try {
    alert('hey')
    console.log('fetch chat called ,')
    console.log(data)

    return await postRequest(apiEndPoint.getChats,data)

} catch (error) {
    console.log(error);
    
}
}