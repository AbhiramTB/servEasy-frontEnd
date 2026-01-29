import React, { useState, useRef, useEffect } from 'react';
import { makeRequest } from '../../../utils/makeRequest';
import { apiEndPoint } from '../../../utils/constant';
import { validateEmail, validatePhone } from '../../../utils/validate';
import { HotToastError, HotToastSuccess } from '../../../utils/notificationToast';
import { ROUTES } from '../../../utils/constants/routes';
const Otp = () => {
  const OtpTimer = 60;
  const otpLength = 6;
  const [otp, setOtp] = useState(new Array(otpLength).fill(''));
  const sumbitRef = useRef<HTMLButtonElement | null>(null);
  const [emilOrPhone, setEmailOrphone] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(() => {
    const savedTimer = localStorage.getItem('otpTimer');

    if (savedTimer === null) {
      return OtpTimer;
    }

    const parsedTimer = parseInt(savedTimer, 10);
    return isNaN(parsedTimer) || parsedTimer <= 0 ? 0 : parsedTimer;
  });

  const [resendOtpLoading, setOtpLoading] = useState<boolean>(false);

  const otpInputRef = useRef<Array<HTMLInputElement | null>>(new Array(otpLength).fill(null));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/[^0-9]/g, '');

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
    const savedTimer = parseInt(localStorage.getItem('otpTimer') || ' ');

    if (typeof savedTimer === 'number' && savedTimer > 0) {
      setTimer(savedTimer);
    }

    const interval = setInterval(() => {
      setTimer(prevTimer => {
        localStorage.setItem('otpTimer', prevTimer.toString());
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
    const storedValue = localStorage.getItem('registerEmailorPhone');
    setEmailOrphone(storedValue);
  }, []);

  const sumbitOtp = async (): Promise<void> => {
    try {
      if (otp.includes('')) {
        HotToastError('Please fill in all the columns!');
        return;
      }
      setLoading(true);
      const data = {
        otp: otp.join(''),
        sender: emilOrPhone,
      };
      const res = await makeRequest('/verify-otp', 'POST', data);
      if (res?.status === 200) {
        HotToastSuccess(res.data.message);
        localStorage.setItem('accessToken', res.data.accessToken);

        window.location.replace(ROUTES.USER.HOME);
      } else {
        console.log(res?.data?.errorMessage);
        console.log(res.data.error);
      }
    } catch (error: any) {
      console.log();

      HotToastError(error?.response?.data?.error || 'Invalid or Expired Otp');
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
      const sender = localStorage.getItem('registerEmailorPhone');
      console.log(sender);
      if (sender) {
        if (validateEmail(sender)) {
          data.email = sender;
        } else if (validatePhone(sender)) {
          data.phone = sender;
        }
      }
      const res = await makeRequest(apiEndPoint.resendOtp, 'POST', data);
      if (res.status == 200) {
        setTimer(OtpTimer);
        HotToastSuccess(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOtpLoading(false);
    }
  };
  return (
    <div className="min-h-[100dvh] w-full bg-grid-pattern flex items-center justify-center p-4">
      <div className="relative z-10 card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body p-6 sm:p-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">OTP Verification!</h2>
            <p className="text-sm sm:text-base text-base-content/70">
              An OTP has already been sent to your <span className="font-medium text-base-content">{emilOrPhone}</span>.
            </p>
          </div>

          <div className="py-8">
            <div className="flex justify-center gap-2 sm:gap-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  ref={el => {
                    otpInputRef.current[index] = el;
                  }}
                  value={value}
                  maxLength={1}
                  inputMode="numeric"
                  onChange={e => handleChange(e, index)}
                  className="w-10 h-12 sm:w-14 sm:h-16 text-2xl font-semibold text-center border-2 rounded-xl border-primary bg-base-100 focus:outline-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center mb-6">
            {timer <= 0 ? (
              <div className="h-6">
                {!resendOtpLoading ? (
                  <button
                    onClick={resendOtp}
                    className="text-sm font-medium text-primary hover:text-primary-focus transition-all"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <span className="loading loading-dots loading-sm text-primary"></span>
                )}
              </div>
            ) : (
              <div className="text-sm text-base-content/60">
                OTP expires in{' '}
                <span className={`font-semibold ${timer > 5 ? 'text-primary' : 'text-error'}`}>{timer}s</span>
              </div>
            )}
          </div>

          <div className="card-actions">
            {loading ? (
              <button className="btn btn-primary btn-block">
                <span className="loading loading-spinner"></span>
                Verifying...
              </button>
            ) : (
              <button
                ref={sumbitRef}
                onClick={sumbitOtp}
                className="btn btn-primary btn-block text-base font-medium shadow-md"
              >
                Verify OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
