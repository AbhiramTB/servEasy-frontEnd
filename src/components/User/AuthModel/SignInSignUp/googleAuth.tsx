import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { apiEndPoint } from "../../../../utils/constant";
import { useNavigate } from "react-router-dom";

const GoogleAuthButton: React.FC = () => {
    const navigate=useNavigate()
  const handleSuccess = async (credentialRes: any) => {
    try {
      const { credential } = credentialRes;

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}${apiEndPoint.googleSign}`,
        {
          googleToken: credential,
        },
        // {withCredentials:true}
      );
      if(res.status===200){
        localStorage.setItem("accessToken", res.data.accessToken);
        
        navigate('/')
      }
      
    } catch (error) {
      console.error("Google Auth Failed", error);
    }
  };

  const handleFailure = () => {
    console.error("Google Login Failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleFailure}
      useOneTap={false}
      theme="filled_black"
      size="large"
      text="signin_with"
      logo_alignment="center"
    />
  );
};

export default GoogleAuthButton;
