import { HotToastError, HotToastSuccess } from '../../../utils/notificationToast';
import { postRequest } from '../../../utils/makeRequestInstance';
import { apiEndPoint } from '../../../utils/constant';
import { useState } from 'react';

interface OtpProps {
  userId: string;
  auth: string;
  closeOtp: () => void;
  getUserProfile: () => Promise<void>;
  closeEdit: () => void;
}

const UpdateProfileOTP: React.FC<OtpProps> = ({ userId, auth, closeOtp, getUserProfile, closeEdit }) => {
  const [otp, setOtp] = useState<string>('');

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.length < 6) {
      HotToastError('OTP must have 6 digits');
      return;
    }

    const data = {
      userId: userId,
      key: auth,
      otp: otp,
    };

    try {
      const res: any = await postRequest(apiEndPoint.updateProfileOtpVerfy, data);

      if (res.status == 200) {
        HotToastSuccess(res.data.message);

        getUserProfile();
        closeOtp();
        closeEdit();
      } else {
        HotToastError(res.message || 'OTP Invalid or Expired');
      }
    } catch (error) {
      HotToastError('OTP Invalid or Expired');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 ">
      <div className="p-12 border bg-base-200 border-primary">
        <form onSubmit={handleOtpSubmit}>
          <div className="relative z-10 my-auto w-96 form-control">
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
                <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="2" />
              </svg>
              <input
                type="text"
                placeholder="6-digit code"
                className="grow"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                pattern="[0-9]{6}"
                maxLength={6}
                required
              />
            </label>
            <label className="label">
              <span className="label-text-alt">Enter the 6-digit code sent to {auth}</span>
            </label>
          </div>
          <div className="mt-6 form-control">
            <button type="submit" className="btn btn-primary">
              Verify OTP
            </button>
          </div>

          <p onClick={closeOtp} className="justify-end mt-3 text-center cursor-pointer hover:text-blue-600">
            BACK TO EDIT
          </p>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileOTP;
