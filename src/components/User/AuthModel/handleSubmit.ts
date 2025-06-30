import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateUserName,
} from "../../../utils/validate";
import { toastifyError } from "../../../utils/Toastify";
import { makeRequest } from "../../../utils/makeRequest";
import { apiEndPoint } from "../../../utils/constant";
import axios from "axios";
import { HotToastSuccess } from "../../../utils/notificationToast";
import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";

interface FormData {
  email?: string;
  phoneNumber?: string;
  password: string;
  name: string;
}


export const handleAuth = async (
  formData: FormData,
  isSignIn: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | boolean>>,
  navigate: NavigateFunction,
  isEmail: boolean
) => {   
  try {
    const submissionData: {
      userName?: string;
      email?: string;
      phone?: string;
      password: string;
    } = { password: formData.password };
      
    let isValidateEmailOrPhone: boolean;
    let isValidatePassword: boolean;
    let isValidateUserName: boolean = true;
     console.log(formData);
     
    if(isEmail){
      delete(submissionData.phone)
      delete(formData.phoneNumber)
    }else if(isEmail==false){
      delete(formData.email)
      delete(submissionData.email)
    }

    if (isSignIn) {
      if (formData.email) {
        submissionData.email = formData.email;
        isValidateEmailOrPhone = validateEmail(submissionData.email);
      } else if (formData.phoneNumber) {
        submissionData.phone = formData.phoneNumber;
        isValidateEmailOrPhone = validatePhone(submissionData.phone);
      } else {
        isValidateEmailOrPhone = false;
        setError("Email or phone is empty.");
      }
    } else {
      submissionData.userName = formData.name;
      isValidateUserName = validateUserName(submissionData.userName);

      if (formData.email) {
        submissionData.email = formData.email;
        isValidateEmailOrPhone = validateEmail(submissionData.email);
      } else if (formData.phoneNumber) {
        submissionData.phone = formData.phoneNumber;
        isValidateEmailOrPhone = validatePhone(submissionData.phone);
      } else {
        isValidateEmailOrPhone = false;
        setError("Email or phone is empty.");
      }
    }

    isValidatePassword = validatePassword(submissionData.password);

    const isValid =
      isValidateEmailOrPhone &&
      isValidatePassword &&
      (isSignIn || isValidateUserName);

    if (isValid) {
      if (isSignIn) {
        let res;
        if (submissionData.phone) {
          localStorage.setItem("registerEmailorPhone", submissionData.phone);

          res = await makeRequest(
            apiEndPoint.SignInPhone,
            "POST",
            submissionData
          );
          console.log(res)
          if (res?.status === 200) {
            HotToastSuccess("login successful");
             localStorage.setItem("accessToken", res.data.accessToken);

            navigate("/", { replace: true });
          }
        } else if (submissionData.email) {
          localStorage.setItem("registerEmailorPhone", submissionData.email);

          res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}${apiEndPoint.SignInEmail}`,
            submissionData,
            {
              withCredentials: true,
            }
          );
        }

        if (res?.status === 200) {
          console.log(res)
          HotToastSuccess("login successful");
                  localStorage.setItem("accessToken", res.data.accessToken);

         navigate("/", { replace: true });
        } else {
          setError(res.data.message || "An error occurred. Please try again.");
        }
      } else {
        const res = await makeRequest(
          apiEndPoint.signUp,
          "POST",
          submissionData
        );
        console.log(res.status);
        console.log(res);

        if (res.status === 201) {
          console.log(res);

          localStorage.setItem("registerEmailorPhone", res.data.regInfo);
          localStorage.removeItem("otpTimer");
          navigate("/otp");
        } else {
          console.log(res.status);

          setError(res.data.message || "An error occurred. Please try again.");
        }
      }
    } else {
      if (!isValidateEmailOrPhone) {
        setError("Please enter a valid email or phone number.");
      } else if (!isSignIn && !isValidateUserName) {
        setError("Username must contain at least 3 characters.");
      } else {
        setError(
          "Password must contain at least 6 characters, including one special character."
        );
      }
    }
  } catch (error: any) {
    if (error?.response?.data?.message) {
      toastifyError(error?.response?.data?.message);
    }
    if (error?.response?.data?.errorOtp) {
      navigate("/otp");
    }
    setError(error?.response?.data?.error);
  } finally {
    setLoading(false);
  }
};
