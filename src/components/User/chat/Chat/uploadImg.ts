import { postRequest } from "../../../utils/makeRequestInstance";

export  async function uploadImage (img: string) {
try {
   const res= await postRequest("/chat/upload-image", { image: img })
   if(res.status===200 && res.data) {
       return res.data; 
   }
} catch (error) {
   console.error("Error uploading image:", error);
   throw new Error("Image upload failed");
}
}