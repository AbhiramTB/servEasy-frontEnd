import React, { useState, useRef, useEffect } from "react";
import { makeRequest } from "../../../utils/makeRequest";
import { ToastContainer } from "react-toastify";
import { toastifyError, toastifySuccess } from "../../../utils/Toastify";
import { useNavigate } from "react-router-dom";
import { apiEndPoint } from "../../../utils/constant";
import { validateEmail, validatePhone } from "../../../utils/validate";
const Otp = () => {
  const otpLength = 6;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const sumbitRef = useRef<HTMLButtonElement | null>(null);
  const [emilOrPhone, setEmailOrphone] = useState<string | null>(null);
  // const [counter, setCounter] = useState<number>(59);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [timer, setTimer] = useState<number>(() => {
    const savedTimer = localStorage.getItem("otpTimer");

    if (savedTimer === null) {
      return 180;
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
        setTimer(180);
        toastifySuccess(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOtpLoading(false);
    }
  };



  return (
    <div className="flex justify-center pt-24">

      <div className="card bg-base-100 w-[500px]  border border-primary shadow-2xl">
        <div className="text-center mt-3">
          <h2 className=" font-mono font-bold text-xl">OTP Verification!</h2>
          <p className="mt-3  font-sans">
            An OTP has already been sent to your {emilOrPhone}.
          </p>{" "}
        </div>
        <figure className="px-16 pt-5">
          <div className="flex  ">
            <div className=" flex  justify-evenly">
              {otp.map((value, index) => {
                return (
                  <input
                    type="text"
                    ref={(el) => {
                      otpInputRef.current[index] = el;
                    }}
                    key={index}
                    value={value}
                    max={1}
                    onChange={(e) => handleChange(e, index)}
                    // onKeyDown={(e)=>handleKeyDown(e,index)}
                    className="border border-primary bg-base-200 rounded-md textarea-primary text-center text-2xl w-14 h-14 m-3"
                  />
                );
              })}
            </div>
          </div>
        </figure>
        <div className="flex justify-end">
          {timer <= 0 ? (
            <div className="">
              <h1
                className="mt-3 mr-10 opacity-90 cursor-pointer font-mono hover:text-primary"
                onClick={() => resendOtp()}
              >
                resend Otp
              </h1>
            </div>
          ) : (
            <div className="">
              <h1 className="mt-3 mr-10 opacity-90  font-mono">
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

        <div className="card-body items-center text-center">
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
  );
};

export default Otp;
