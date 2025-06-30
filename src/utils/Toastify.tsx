import { toast,Bounce, Flip } from "react-toastify";
export const toastifySuccess=(message:string):void=>{
   
  


    toast.success(`${message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"dark",
        transition: Flip,
        });
     

}


export const toastifyWarn=(message:string):void=>{

    toast.warn(`${message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"dark",
        transition: Bounce,
        });
     

}
export const toastifyError=(message:string):void=>{
    toast.error(`${message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"dark",
        transition:Flip,
        });
     

}

