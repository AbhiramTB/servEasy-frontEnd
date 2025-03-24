import React, { useState } from "react";
import {
  X,
  Mail,
  PhoneCall,
  Edit,
  Save,
  XCircle,
  Upload,
  Phone,
} from "lucide-react";
import { UserState } from "../../redux/slices/userSlice";
import { validateEmail, validatePhone } from "../../utils/validate";
import { HotToastError, HotToastSuccess } from "../../utils/HotToasitify";
import { postRequest, putRequest } from "../../utils/makeRequestInstance";
import { apiEndPoint } from "../../utils/constant";
import { Toaster } from "react-hot-toast";
interface UserProfileProps {
  user: UserState;
  IsCloss: () => void;
  getUserProfile: () => void;
}

const UserProfileModal: React.FC<UserProfileProps> = ({
  user,
  IsCloss,
  getUserProfile,
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isEmailUser, setEmailUser] = useState<boolean>(!!user.email);
  const [editData, setEditData] = useState<UserState>({ ...user });
  const [isOtpVerify, setOtpVerify] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState<string>(user.email || "");
  const [newUserName, setNewUserName] = useState<string>(user.userName || "");
  const [newPhone, setNewPhone] = useState<string>(user.phone || "");
  const [profileImage, setProfileImage] = useState<string | null>(
    user.profileImage || null
  );
  const [newImage, setNewImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const toggleModal = (): void => {
    IsCloss();
    if (isEditMode) cancelEdit();
  };

  const toggleEditMode = (): void => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      resetForm();
    }
  };

  const resetForm = (): void => {
    setEditData({ ...user });
    setProfileImage(user.profileImage || null);
    setImageFile(null);
    setNewEmail(user.email || "");
    setNewUserName(user.userName || "");
    setNewPhone(user.phone || "");
    setNewImage("");
  };

  const cancelEdit = (): void => {
    setIsEditMode(false);
    resetForm();
  };

  const saveChanges = async (): Promise<void> => {
    let data: Record<string, string> = {};
    let hasValidationError = false;

    if (newEmail) {
      if (!validateEmail(newEmail)) {
        HotToastError("Enter a valid email address");
        hasValidationError = true;
      } else if (newEmail !== user.email) {
        data.newEmail = newEmail;
      }
    }

    if (newPhone) {
      if (!validatePhone(newPhone)) {
        HotToastError("Enter a 10-digit phone number");
        hasValidationError = true;
      } else if (newPhone !== user.phone) {
        data.newPhone = newPhone;
      }
    }

    if (newUserName.length < 3) {
      HotToastError("Username must have at least 3 characters");
      hasValidationError = true;
    } else if (newUserName !== user.userName) {
      data.newUserName = newUserName;
    }

    if (newImage) {
      data.NewProfileImage = newImage;
    }

    if (hasValidationError) return;

    if (Object.keys(data).length > 0) {
      try {
        const res: any = await putRequest(
          `${apiEndPoint.updateProfile}/${user._id}`,
          data
        );
        if (res.status === 200) {
          HotToastSuccess(res.data.message);
          setTimeout(() => {
            IsCloss();
          }, 3000);

          getUserProfile();
        }

        if (res.status == 203) {
          HotToastSuccess(res.data.message);
          setOtpVerify(res.data.auth);
        }
      } catch (error) {
        HotToastError("Failed to update profile");
        console.error("Error saving changes:", error);
      }
    } else {
      HotToastSuccess("No changes to save");
      setIsEditMode(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "newEmail") setNewEmail(value);
    else if (name === "newPhone") setNewPhone(value);
    else if (name === "newUserName") setNewUserName(value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageResult = event.target.result as string;
          setNewImage(imageResult);
          setProfileImage(imageResult);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="font-sans">
      <Toaster />
      {!isOtpVerify && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 bg-base-300">
          <div className="w-full max-w-md overflow-hidden rounded-lg shadow-xl bg-base-100">
            <div className="flex items-center justify-between px-6 py-4 bg-primary">
              <h3 className="text-lg font-semibold text-primary-content">
                {isEditMode ? "Edit Profile" : "User Profile"}
              </h3>
              <button
                onClick={toggleModal}
                className="text-primary-content hover:text-primary-focus"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col items-center px-6 py-6 border-b border-base-300">
              <div className="relative mb-4">
                <div className="w-32 h-32 overflow-hidden rounded-md">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />

                    
                  ) : (
                    <div className="flex items-center justify-center w-24 h-24 text-2xl font-bold rounded-full bg-primary text-primary-content">
                      {newUserName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                {isEditMode && (
                  <div className="absolute bottom-0 right-0">
                    <label
                      htmlFor="imageUpload"
                      className="btn btn-circle btn-primary btn-sm"
                    >
                      <Upload size={16} />
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
              </div>

              {isEditMode ? (
                <input
                  className="w-full px-3 py-2 border rounded input input-bordered"
                  name="newUserName"
                  value={newUserName}
                  onChange={handleChange}
                  placeholder="Username"
                />
                

                
              ) : (
                <div className="flex flex-col gap-4">
                  
                  <h2 className="text-2xl font-bold text-center text-primary">
                    {user.userName}
                  </h2>

                  <div className="my-1 divider"></div>

                  <div className="flex flex-col gap-3">
                    {user.email && (
                      <div className="flex items-center gap-3 transition-colors text-base-content/80 hover:text-primary">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Mail size={18} className="text-primary" />
                        </div>
                        <span>{user.email}</span>
                      </div>
                    )}

                    {user.phone && (
                      <div className="flex items-center gap-3 transition-colors text-base-content/80 hover:text-primary">
                        <div className="p-2 rounded-full bg-primary/10">
                          <PhoneCall size={18} className="text-primary" />
                        </div>
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {isEditMode && (
                <button
                  className="p-2 mt-2 rounded bg-primary text-primary-content"
                  onClick={() => {
                    setEmailUser(!isEmailUser);
                    setNewEmail(user.email || "");
                    setNewPhone(user.phone || "");
                  }}
                >
                  Toggle Email/Phone
                </button>
              )}

              {isEmailUser && isEditMode ? (
                <input
                  className="w-full px-3 py-2 mt-2 border rounded input input-bordered"
                  name="newEmail"
                  value={newEmail}
                  onChange={handleChange}
                  placeholder="Email"
                />
              ) : (
                isEditMode && (
                  <input
                    className="w-full px-3 py-2 mt-2 border rounded input input-bordered"
                    name="newPhone"
                    value={newPhone}
                    onChange={handleChange}
                    placeholder="Phone"
                  />
                )
              )}
            </div>

            <div className="flex justify-end px-6 py-4 bg-base-200">
              {isEditMode ? (
                <>
                  <button onClick={cancelEdit} className="btn btn-ghost">
                    <XCircle size={16} /> Cancel
                  </button>
                  <button onClick={saveChanges} className="btn btn-success">
                    <Save size={16} /> Save
                  </button>
                </>
              ) : (
                <>
                  <button onClick={toggleEditMode} className="btn btn-primary">
                    <Edit size={16} /> Edit
                  </button>
                  <button onClick={toggleModal} className="btn btn-ghost">
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {isOtpVerify && (
        <OTP
          userId={user._id + ""}
          auth={isOtpVerify}
          closeOtp={() => setOtpVerify(null)}
          IsCloss={IsCloss}
          getUserProfile={getUserProfile}
        />
      )}
    </div>
  );
};

export default UserProfileModal;

interface OtpProps {
  userId: string;
  auth?: string;
  closeOtp?: () => void;
  IsCloss: () => void;
  getUserProfile: () => void;
}

const OTP: React.FC<OtpProps> = ({
  userId,
  auth,
  closeOtp,
  IsCloss,
  getUserProfile,
}) => {
  const [otp, setOtp] = useState<string>("");

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.length < 6) {
      HotToastError("OTP must have 6 digits");
      return;
    }

    const data = {
      userId: userId,
      key: auth,
      otp: otp,
    };

    try {
      const res: any = await postRequest(
        apiEndPoint.updateProfileOtpVerfy,
        data
      );

      if (res.status == 200) {
        HotToastSuccess(res.data.message);

        setTimeout(() => {
          if (closeOtp) closeOtp();
          IsCloss();
        }, 3000);
        getUserProfile();
      } else {
        HotToastError(res.message || "OTP verification failed");
      }
    } catch (error) {
      HotToastError("An error occurred during OTP verification");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 ">
      <div className="p-12 border bg-base-200 border-primary">
        <form onSubmit={handleOtpSubmit}>
          <Toaster />
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
                Enter the 6-digit code sent to {auth}
              </span>
            </label>
          </div>
          <div className="mt-6 form-control">
            <button type="submit" className="btn btn-primary">
              Verify OTP
            </button>
          </div>

          <p
            onClick={closeOtp}
            className="justify-end mt-3 text-center cursor-pointer hover:text-blue-600"
          >
            back to Home
          </p>
        </form>
      </div>
    </div>
  );
};