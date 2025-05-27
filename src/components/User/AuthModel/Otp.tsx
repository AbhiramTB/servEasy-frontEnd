import React, { useState, useRef, useEffect } from "react";
import { makeRequest } from "../../../utils/makeRequest";
import { ToastContainer } from "react-toastify";
import { toastifyError, toastifySuccess } from "../../../utils/Toastify";
import { useNavigate } from "react-router-dom";
import { apiEndPoint } from "../../../utils/constant";
import { validateEmail, validatePhone } from "../../../utils/validate";
const Otp = () => {
  const OtpTimer=60;
  const otpLength = 6;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const sumbitRef = useRef<HTMLButtonElement | null>(null);
  const [emilOrPhone, setEmailOrphone] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [timer, setTimer] = useState<number>(() => {
 const savedTimer = localStorage.getItem("otpTimer");
    
    if (savedTimer === null) {
      return OtpTimer;
    }

    const parsedTimer = parseInt(savedTimer, 10);
    return isNaN(parsedTimer) || parsedTimer <= 0 ? 0 : parsedTimer;
  });

  const [resendOtpLoading, setOtpLoading] = useState<boolean>(false);

  const otpInputRef = useRef<Array<HTMLInputElement | null>>(
    new Array(otpLength).fill(null)
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    const newotp = [...otp];
    newotp[index] = value;
    setOtp(newotp);
    if (value && index < otpLength - 1) {
      otpInputRef.current[index + 1]?.focus();
    } else if (index === otpLength - 1) {
      sumbitRef.current?.focus();
    }
  };

  useEffect(() => {
    const savedTimer = parseInt(localStorage.getItem("otpTimer") || " ");

    if (typeof savedTimer === "number" && savedTimer > 0) {
      setTimer(savedTimer);
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        localStorage.setItem("otpTimer", prevTimer.toString());
        if (prevTimer <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });

      return () => clearInterval(interval);
    }, 1000);
  }, [resendOtpLoading]);

  useEffect(() => {
    const storedValue = localStorage.getItem("registerEmailorPhone");
    setEmailOrphone(storedValue);
  }, []);

  const sumbitOtp = async (): Promise<void> => {
    try {
      if (otp.includes("")) {
        toastifyError("Please fill in all the columns!");
        return;
      }
      setLoading(true);
      const data = {
        otp: otp.join(""),
        sender: emilOrPhone,
      };
      const res = await makeRequest("/verify-otp", "POST", data);

      if (res?.status === 200) {
        toastifySuccess(res.data.message);

        navigate("/");
      } else {
        console.log(res?.data?.errorMessage);
      }
    } catch (error: any) {
      toastifyError(error?.response?.data.errorMessage + " ");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setOtpLoading(true);

      type data = {
        email?: string;
        phone?: string;
      };
      const data: data = {};
      const sender = localStorage.getItem("registerEmailorPhone");
      console.log(sender);
      if (sender) {
        if (validateEmail(sender)) {
          data.email = sender;
        } else if (validatePhone(sender)) {
          data.phone = sender;
        }
      }
      const res = await makeRequest(apiEndPoint.resendOtp, "POST", data);
      if (res.status == 200) {
        setTimer(OtpTimer);
        toastifySuccess(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOtpLoading(false);
    }
  };



return (
  <div className="relative w-full h-full min-h-screen bg-black">
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>

    {/* OTP Card */}
    <div className="relative z-10 flex justify-center pt-24">
      <div className="card bg-base-100 w-[500px] border border-primary shadow-2xl">
        <div className="mt-3 text-center">
          <h2 className="font-mono text-xl font-bold">OTP Verification!</h2>
          <p className="mt-3 font-sans">
            An OTP has already been sent to your {emilOrPhone}.
          </p>
        </div>
        <figure className="px-16 pt-5">
          <div className="flex justify-evenly">
            {otp.map((value, index) => (
              <input
                type="text"
                ref={(el) => {
                  otpInputRef.current[index] = el;
                }}
                key={index}
                value={value}
                maxLength={1}
                onChange={(e) => handleChange(e, index)}
                className="m-3 text-2xl text-center border rounded-md border-primary bg-base-200 textarea-primary w-14 h-14"
              />
            ))}
          </div>
        </figure>

        <div className="flex justify-end">
          {timer <= 0 ? (
            <div>
              {!resendOtpLoading ? (
                <h1
                  className="mt-3 mr-10 font-mono cursor-pointer opacity-90 hover:text-primary"
                  onClick={resendOtp}
                >
                  resend Otp
                </h1>
              ) : (
                <span className="mt-3 mr-10 font-mono cursor-pointer opacity-90 hover:text-primary loading loading-dots loading-sm"></span>
              )}
            </div>
          ) : (
            <div>
              <h1 className="mt-3 mr-10 font-mono opacity-90">
                OTP expires in{" "}
                {timer > 5 ? (
                  <span className="text-primary">{timer}</span>
                ) : (
                  <span className="text-red-600">{timer}</span>
                )}
              </h1>
            </div>
          )}
        </div>

        <div className="items-center text-center card-body">
          <div className="card-actions">
            {loading ? (
              <span className="loading loading-bars loading-lg bg-primary"></span>
            ) : (
              <button
                ref={sumbitRef}
                onClick={sumbitOtp}
                className="btn btn-primary"
              >
                verify Otp
              </button>
            )}
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  </div>
);

};

export default Otp;



