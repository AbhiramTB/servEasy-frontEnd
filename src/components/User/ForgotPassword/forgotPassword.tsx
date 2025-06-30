import React, { useState} from "react";
import { validateEmail, validatePassword } from "../../../utils/validate";
import { makeRequest } from "../../../utils/makeRequest";
import { apiEndPoint } from "../../../utils/constant";
type Props = {
    setForget: React.Dispatch<React.SetStateAction<boolean>>;
  };

const ForgotPassword: React.FC<Props> = ({ setForget }) => {
  const [step, setStep] = useState(1);
  const [key, setkey] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(true);
   
 
  
 
    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    if(isEmail){
        if(!key&&!validateEmail(key)){
            setError("please enter a valid email address");
            return;
        }
        const data={email:key}
        const res =  await sendData(apiEndPoint.forgotPassword,data)
       
       if(res){
        setError("");
    
        setStep(2);
     }
    }else{
        if(!key&&!validateEmail(key)){
            setError("please enter a valid email address");
            return;
        }
        const data={phone:key}
       const res=await sendData(apiEndPoint.forgotPassword,data)
       if(res){
        setError("");
    
        setStep(2);
     }
    }
     
    
  };

 async function sendData(url:string,data:object){
    
    try {
        const res= await makeRequest(url,"POST",data)
        console.log(res);
        if(res.status==200){
          return true   
        }
        return false
    } catch (error:any) {
        if(error.response.data.Message){
             setError(error.response.data.Message)
        }
        console.log(error);
        
    }
 }

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    const data={otp,key}
    const res = await sendData(apiEndPoint.forgotPasswordVerifyOtp,data) 
    if(res){
        setError("");
        console.log("OTP verified:", otp);
        setStep(3);
    }
  
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    if (!validatePassword(password)) {
      setError("Your password must be at least 6 characters long and include at least one special character (e.g., !@#$%^&*)");
      return;
    }  const data:{email?:string,phone?:string,password:string}={password}
    if(isEmail==true){
      data.email=key
    }
    if(isEmail==false){
        data.phone=key
    }
    const res=await sendData(apiEndPoint.resetPassword,data)
    if(res==true){
        setError("");
        setStep(4);
    }
  
   
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="shadow-xl card w-96 bg-base-100">
        <div className="card-body">
          <h2 className="justify-center mb-6 text-2xl font-bold text-center card-title">
            {step === 1 && "Password Recovery"}
            {step === 2 && "Verify OTP"}
            {step === 3 && "Reset Password"}
            {step === 4 && "Success"}
          </h2>

          <ul className="w-full mb-6 steps steps-vertical lg:steps-horizontal">
            <li className={`step ${step >= 1 ? "step-primary" : ""}`}>Email</li>
            <li className={`step ${step >= 2 ? "step-primary" : ""}`}>OTP</li>
            <li className={`step ${step >= 3 ? "step-primary" : ""}`}>
              Password
            </li>
            <li className={`step ${step >= 4 ? "step-primary" : ""}`}>
              Complete
            </li>
          </ul>

          {error && (
            <div className="mb-4 alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 stroke-current shrink-0"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <div className="w-full form-control">
                <div className="pb-2 bg-base-100">
                  <p className="mr-4 text-sm">
                    Select register Method:
                  </p>

                  <label className="label">
                    <div className="flex ">
                      <label htmlFor="">Email</label>
                      <input
                        type="radio"
                        name="radio-4"
                        className="ml-1 mr-4 radio radio-xs radio-primary"
                        defaultChecked
                        onClick={() => {setIsEmail(true) 
                            setkey("")}}
                      />
                      <label htmlFor="">Phone</label>
                      <input
                        type="radio"
                        name="radio-4"
                        className="ml-1 radio radio-xs radio-primary"

                        onClick={() =>{ setIsEmail(false)
                            setkey("")
                        }}
                      />
                    </div>
                  </label>
                </div>

                {!isEmail && (
                  <label className="flex items-center gap-2 input input-bordered">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-phone"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>

                    <input
                      type="tel"
                      placeholder="Enter your phoneNumber"
                      className="grow"
                      maxLength={10}
                      value={key}
                      onChange={(e) => setkey(e.target.value)}
                      required
                    />
                  </label>
                )}

                {isEmail && (
                  <label className="flex items-center gap-2 input input-bordered">
                    <svg
                      className="w-4 h-4 opacity-70"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        fill="none"
                        stroke="currentColor"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </g>
                    </svg>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="grow"
                      value={key}
                      onChange={(e) => setkey(e.target.value)}
                      required
                    />
                  </label>
                )}
                <label className="label">
                  <span className="label-text-alt">
                    We'll send a verification code to this {isEmail==true?"email":'phone'}
                  </span>
                </label>
              </div>
              <div className="mt-6 form-control">
                <button type="submit" className="btn btn-primary">
                  Send OTP
                </button>
              </div>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="p-0 btn btn-link btn-sm"
                  onClick={() => setForget(false)}
                >
                  Back to login/signup
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <div className="w-full form-control">
                <label className="label">
                  <span className="label-text">Enter OTP</span>
                </label>
                <label className="flex items-center gap-2 input input-bordered">
                  <svg
                    className="w-4 h-4 opacity-70"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v3m-3-3h6m-6 0v-3m0 0h6v3"
                    />
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="16"
                      rx="2"
                      strokeWidth="2"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="6-digit code"
                    className="grow"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                  />
                </label>
                <label className="label">
                  <span className="label-text-alt">
                    Enter the 6-digit code sent to {key}
                  </span>
                </label>
              </div>
              <div className="mt-6 form-control">
                <button type="submit" className="btn btn-primary">
                  Verify OTP
                </button>
              </div>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="p-0 btn btn-link btn-sm"
                  onClick={() => setStep(1)}
                >
                  Back to Email
                </button>
              </div>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="w-full form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <label className="flex items-center gap-2 input input-bordered">
                  <svg
                    className="w-4 h-4 opacity-70"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New password"
                    className="grow"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
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
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
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
                </label>
                <label className="label">
                  <span className="label-text-alt">
                    Must be at least 6 characters
                  </span>
                </label>
              </div>

              <div className="w-full form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <label className="flex items-center gap-2 input input-bordered">
                  <svg
                    className="w-4 h-4 opacity-70"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="grow"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
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
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
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
                </label>
              </div>

              <div className="mt-6 form-control">
                <button type="submit" className="btn btn-primary">
                  Reset Password
                </button>
              </div>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="p-0 btn btn-link btn-sm"
                  onClick={() => setStep(2)}
                >
                  Back to OTP
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg
                  className="w-16 h-16 text-success"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Password Reset Successful
              </h3>
              <p className="mb-6">Your password has been reset successfully.</p>
              <button
                className="btn btn-primary"
                onClick={() => setForget(false)}
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword
