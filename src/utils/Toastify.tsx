import { toast,Bounce, Flip } from "react-toastify";
import { darkTheme } from "./constant";
export const toastifySuccess=(message:string):void=>{
  const theme=localStorage.getItem("theme")
   
  


    toast.success(`${message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme == darkTheme ? "dark":"light",
        transition: Flip,
        });
     

}


export const toastifyWarn=(message:string):void=>{
    const theme=localStorage.getItem("theme")

    toast.warn(`${message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme == darkTheme ? "dark":"light",
        transition: Bounce,
        });
     

}
export const toastifyError=(message:string):void=>{
    const theme=localStorage.getItem("theme")
    toast.error(`${message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme == darkTheme ? "dark":"light",
        transition:Flip,
        });
     

}

