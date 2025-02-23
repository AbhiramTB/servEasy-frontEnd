import React, { useState, ChangeEvent, FormEvent } from "react";
import { makeRequest } from "../../utils/makeRequest";
import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateUserName,
} from "../../utils/validate";
import { ToastContainer, toast, Bounce } from "react-toastify";
import ErrorAlertInfo from "../alert's/ErrorAlert";
interface FormData {
  email?: string;
  phoneNumber?: string;
  password: string;
  name: string;
}



const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [useEmail, setUseEmail] = useState<boolean>(true);
  const [isError, setError] = useState<boolean | string>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phoneNumber: "",
    password: "",
    name: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
  
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
  
      const isValid = isValidateEmailOrPhone && isValidatePassword && (isSignIn || isValidateUserName);
      
      if (isValid) {
        const endpoint = isSignIn ? "/signin" : "/signup";
        const res = await makeRequest(endpoint, "POST", submissionData);
        
        if (res.status === 200) {
          toast.success(res?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        } else {
          setError(res.data.message || 'An error occurred. Please try again.');
        }
      } else {
        if (!isValidateEmailOrPhone) {
          setError("Please enter a valid email or phone number.");
        } else if (!isSignIn && !isValidateUserName) {
          setError("Username must contain at least 3 characters.");
        } else {
          setError("Password must contain at least 6 characters, including one special character.");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleSocialLogin = async (provider: "google"): Promise<void> => {
  //   if (onSocialLogin) {
  //     try {
  //       setLoading(true);
  //       // await (provider);
  //     } catch (error) {
  //       console.error(`${provider} login error:`, error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  // const handleForgotPassword = async (): Promise<void> => {
  //   if (onForgotPassword && (formData.email || formData.phoneNumber)) {
  //     try {
  //       setLoading(true);
  //       await onForgotPassword(
  //         useEmail ? formData.email : formData.phoneNumber
  //       );
  //     } catch (error) {
  //       console.error("Forgot password error:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center">
            {isSignIn ? "Sign In" : "Create Account"}
          </h2>
          <p className="text-center text-base-content/70">
            {isSignIn
              ? "Enter your credentials to access your account"
              : "Fill in the information to create your account"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {!isSignIn && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>
            )}

            <div className="form-control">
              <div className="flex justify-center space-x-2 mb-2 ml-[-173px]">
                <label className="cursor-pointer label">
                  <input
                    type="radio"
                    name="contact-method"
                    className="radio radio-primary"
                    checked={useEmail}
                    onChange={() => setUseEmail(true)}
                  />
                  <span className="label-text ml-2">Email</span>
                </label>
                <label className="cursor-pointer label">
                  <input
                    type="radio"
                    name="contact-method"
                    className="radio radio-primary"
                    checked={!useEmail}
                    onChange={() => setUseEmail(false)}
                  />
                  <span className="label-text ml-2">Phone Number</span>
                </label>
              </div>

              {useEmail ? (
                <div className="form-control">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    value={formData.email}
                    onChange={handleChange}
                    required={useEmail}
                    autoComplete="email"
                  />
                </div>
              ) : (
                <div className="form-control">
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="phoneNumber"
                    className="input input-bordered w-full"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required={!useEmail}
                    autoComplete="tel"
                  />
                </div>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
                {isSignIn && (
                  <button
                    type="button"
                    // onClick={handleForgotPassword}
                    className="label-text-alt link link-hover"
                    disabled={!formData.email || loading}
                  >
                    Forgot password?
                  </button>
                )}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="******"
                  className="input input-bordered w-full"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  autoComplete={isSignIn ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/70 hover:text-base-content"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

           { loading? <div className="flex justify-center"> <span className="loading loading-bars loading-lg bg-primary"></span>
   </div> : <button
              type="submit"
              className={`btn btn-primary w-full mt-6 ${loading ?  "loading loading-bars loading-xs"  : ""}`}
              disabled={loading}
            >
              {isSignIn ? "Sign In" : "Create Account"}
            </button>}
          </form>

          <div className="divider">OR</div>

          {/* <div className="space-y-3">
            <button
              className="btn btn-outline w-full"
              // onClick={() => handleSocialLogin("google")}
              disabled={loading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Continue with Google
            </button>
          </div> */}

          <div className="text-center mt-4">
            {isSignIn ? (
              <p className="text-base-content/70">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignIn(false)}
                  className="link link-primary"
                  disabled={loading}
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-base-content/70">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignIn(true)
                    setError(false)
                  }
                  }
                  className="link link-primary"
                  disabled={loading}
                >
                  Sign in
                </button>
              </p>
            )}
            
  {isError &&
<ErrorAlertInfo isError={isError}/>
}
          </div>
        </div>
      </div>
      <ToastContainer />


    </div>
  );
};

export default AuthPage;
