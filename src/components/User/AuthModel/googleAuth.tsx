import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { apiEndPoint } from '../../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/constants/routes';

const GoogleAuthButton: React.FC = () => {
  const navigate = useNavigate();
  const handleSuccess = async (credentialRes: any) => {
    try {
      const { credential } = credentialRes;

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}${apiEndPoint.googleSign}`,
        {
          googleToken: credential,
        }
        // {withCredentials:true}
      );
      if (res.status === 200) {
        localStorage.setItem('accessToken', res.data.accessToken);

        navigate(ROUTES.USER.HOME);
      }
    } catch (error) {
      console.error('Google Auth Failed', error);
    }
  };

  const handleFailure = () => {
    console.error('Google Login Failed');
  };

  return (
    <div className="">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
        useOneTap={false}
        theme="outline"
        size="large"
        shape="rectangular"
        text="continue_with"
        logo_alignment="center"
        width="400"
      />
    </div>
  );
};

export default GoogleAuthButton;
