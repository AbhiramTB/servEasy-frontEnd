import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../../../utils/validate';
import { makeRequest } from '../../../utils/makeRequest';
import { apiEndPoint } from '../../../utils/constant';
import { HotToastError, HotToastSuccess } from '../../../utils/notificationToast';

type Props = {
  setForget: React.Dispatch<React.SetStateAction<boolean>>;
};

const ForgotPassword: React.FC<Props> = ({ setForget }) => {
  const [step, setStep] = useState(1);
  const [key, setkey] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function sendData(url: string, data: object) {
    try {
      setIsLoading(true);
      const res = await makeRequest(url, 'POST', data);

      if (res && (res.status === 200 || res.status === 201)) {
        return true;
      }
      return false;
    } catch (error: any) {
      const errMsg = error?.response?.data?.message || 'An unexpected error occurred.';
      HotToastError(errMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEmail && !validateEmail(key)) {
      return HotToastError('Please enter a valid email address');
    }
    if (!isEmail && key.length < 10) {
      return HotToastError('Please enter a valid phone number');
    }

    const payload = isEmail ? { email: key } : { phone: key };
    const success = await sendData(apiEndPoint.forgotPassword, payload);

    if (success) {
      HotToastSuccess(`OTP sent to your ${isEmail ? 'email' : 'phone'}`);
      setStep(2);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.length !== 6) {
      return HotToastError('Please enter a valid 6-digit OTP');
    }

    const payload = {
      otp,
      key,
    };

    const success = await sendData(apiEndPoint.forgotPasswordVerifyOtp, payload);
    if (success) {
      setStep(3);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return HotToastError('Passwords do not match');
    }
    if (!validatePassword(password)) {
      return HotToastError('Password must be 6+ chars with a special character');
    }

    const payload = {
      password,
      [isEmail ? 'email' : 'phone']: key,
      otp, // Including OTP in final step is a common security best practice
    };

    const success = await sendData(apiEndPoint.resetPassword, payload);
    if (success) {
      setStep(4);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200/50">
      <div className="shadow-2xl card w-96 bg-base-100">
        <div className="card-body">
          <h2 className="justify-center mb-6 text-2xl font-bold text-center card-title">
            {step === 1 && 'Recovery'}
            {step === 2 && 'Verify OTP'}
            {step === 3 && 'New Password'}
            {step === 4 && 'All Set!'}
          </h2>

          {/* Progress Steps */}
          <ul className="w-full mb-6 steps steps-horizontal">
            <li className={`step ${step >= 1 ? 'step-primary' : ''}`}></li>
            <li className={`step ${step >= 2 ? 'step-primary' : ''}`}></li>
            <li className={`step ${step >= 3 ? 'step-primary' : ''}`}></li>
            <li className={`step ${step >= 4 ? 'step-primary' : ''}`}></li>
          </ul>

          {/* STEP 1: Identification */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <div className="form-control">
                <div className="flex justify-center gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer label">
                    <span className="label-text">Email</span>
                    <input
                      type="radio"
                      className="radio radio-primary radio-sm"
                      checked={isEmail}
                      onChange={() => {
                        setIsEmail(true);
                        setkey('');
                      }}
                    />
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer label">
                    <span className="label-text">Phone</span>
                    <input
                      type="radio"
                      className="radio radio-primary radio-sm"
                      checked={!isEmail}
                      onChange={() => {
                        setIsEmail(false);
                        setkey('');
                      }}
                    />
                  </label>
                </div>

                <label className="flex items-center gap-2 input input-bordered">
                  {isEmail ? (
                    <svg className="w-4 h-4 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  )}
                  <input
                    type={isEmail ? 'email' : 'tel'}
                    placeholder={isEmail ? 'your@email.com' : 'Phone number'}
                    className="grow"
                    value={key}
                    onChange={e => setkey(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </label>
              </div>
              <button
                type="submit"
                className={`btn btn-primary w-full mt-6 ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Send OTP'}
              </button>
              <button type="button" className="w-full mt-4 btn btn-ghost btn-sm" onClick={() => setForget(false)}>
                Back to login
              </button>
            </form>
          )}

          {/* STEP 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">6-Digit Code</span>
                </label>
                <input
                  type="text"
                  placeholder="000000"
                  className="text-center tracking-widest input input-bordered"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                className={`btn btn-primary w-full mt-6 ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                Verify Code
              </button>
              <button type="button" className="w-full mt-2 btn btn-link btn-xs" onClick={() => setStep(1)}>
                Change {isEmail ? 'email' : 'phone'}
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="flex items-center gap-2 input input-bordered">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="New Password"
                      className="grow"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? '⊘' : '⊙'}
                    </span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="flex items-center gap-2 input input-bordered">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      className="grow"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <span className="cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? '⊘' : '⊙'}
                    </span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className={`btn btn-primary w-full mt-6 ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                Update Password
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center animate-in fade-in zoom-in">
              <div className="flex justify-center mb-4 text-success">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold">Success!</h3>
              <p className="text-sm opacity-70">Your password has been updated.</p>
              <button className="w-full mt-6 btn btn-primary" onClick={() => setForget(false)}>
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
