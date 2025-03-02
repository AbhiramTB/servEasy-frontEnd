import {toast} from "react-hot-toast"
import { darkTheme } from "./constant";

export  function HotToastError(message:string){
  const theme=localStorage.getItem("theme")

  if(theme == darkTheme ){
  toast(message||"error",
    {
      icon: '❌',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    }
  );

}else{
    toast(message||"error",
      {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#fff',
          color: '#333 ',
        },
      }
    );
  }
}


