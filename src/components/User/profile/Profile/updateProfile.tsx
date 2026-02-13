import { useState } from 'react';
import { X, Edit, Save, Camera } from 'lucide-react';
import { HotToastError, HotToastSuccess } from '../../../../utils/notificationToast';
import { getRequest, putRequest } from '../../../../utils/makeRequestInstance';
import { apiEndPoint } from '../../../../utils/constant';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { validateEmail, validatePassword, validatePhone, validateUserName } from '../../../../utils/validate';
import { addUser } from '../../../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import UpdateProfileOTP from './UpdateProfileOtp';
import InitialAvatar from '../../../../utils/ui/InitialAvatar';

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.user);
  const [isLoading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newEmail, setNewEmail] = useState(user.email || '');
  const [newUserName, setNewUserName] = useState(user.userName || '');
  const [newPhone, setNewPhone] = useState(user.phone || '');
  const [profileImage, setProfileImage] = useState(user.profileImage || null);
  const [newImage, setNewImage] = useState('');
  const [contactType, setContactType] = useState(user.email ? 'email' : 'phone');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  const [isOtpVerify, setOtpVerify] = useState<string | null>(null);
  const dispatch = useDispatch();
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      resetForm();
    }
  };

  const getUserProfile = async () => {
    try {
      const res = await getRequest(apiEndPoint.getUserProfile);
      if (res.data?.user) {
        dispatch(addUser(res.data.user));
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const resetForm = () => {
    setProfileImage(user.profileImage || null);
    setNewEmail(user.email || '');
    setNewUserName(user.userName || '');
    setNewPhone(user.phone || '');
    setNewImage('');
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    resetForm();
  };

  const saveChanges = async (): Promise<void> => {
    let data: Record<string, string> = {};
    let hasValidationError = false;

    if (newEmail) {
      if (!validateEmail(newEmail)) {
        HotToastError('Enter a valid email address');
        hasValidationError = true;
      } else if (newEmail !== user.email) {
        data.newEmail = newEmail;
      }
    }

    if (newPassword) {
      if (!oldPassword?.trim()) {
        HotToastError('Enter your current password');
        hasValidationError = true;
      } else if (!validatePassword(newPassword)) {
        HotToastError('Password must contain at least 6 characters, including one special character.');
        hasValidationError = true;
      } else {
        data.newPassword = newPassword;
        data.oldPassword = oldPassword;
      }
    }

    if (newPhone) {
      if (!validatePhone(newPhone)) {
        HotToastError('Enter a 10-digit phone number');
        hasValidationError = true;
      } else if (newPhone !== user.phone) {
        data.newPhone = newPhone;
      }
    }

    if (!validateUserName(newUserName)) {
      HotToastError(
        'Username should be 3–20 characters and can include letters, numbers, dots, underscores, and hyphens.'
      );
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
        setLoading(true);

        const res: any = await putRequest(`${apiEndPoint.updateProfile}/${user._id}`, data);

        if (res.status === 200) {
          HotToastSuccess(res.data.message);
          getUserProfile();
          setIsEditMode(false);
        }
        if (res.status == 203) {
          HotToastSuccess(res.data.message);
          setOtpVerify(res.data.auth);
        }
      } catch (error: any) {
        HotToastError(error.response.data.message ?? 'Failed to update profile');
        console.error('Error saving changes:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      HotToastSuccess('No changes to save');
      setIsEditMode(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'newEmail') setNewEmail(value);
    else if (name === 'newPhone') setNewPhone(value);
    else if (name === 'newUserName') setNewUserName(value);
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'oldPassword') setOldPassword(value);
  };

  const handleImageUpload = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = event => {
        if (event.target?.result) {
          const imageResult: any = event.target.result;
          setNewImage(imageResult);
          setProfileImage(imageResult);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isEditMode) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto shadow bg-base-300 rounded-xl">
          <div className="flex items-center justify-between p-6 border-b border-base-300">
            <h2 className="text-xl font-semibold">Profile</h2>
            <button onClick={toggleEditMode} className="btn btn-primary">
              <Edit size={16} />
              Edit
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                {/* {user.profileImage && (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="object-cover w-24 h-24 border-4 border-gray-100 rounded-full"
                  />
                )} */}

                <InitialAvatar name={user.userName} bgColor="bg-base-100" size={100} imageSrc={user.profileImage} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{user.userName}</h3>
                <p className="text-base-content/60">User Profile</p>
              </div>
            </div>

            <div className="space-y-6">
              {user.email && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="label">
                      <span className="label-text">Email Address</span>
                    </label>
                  </div>
                  <div className="w-full cursor-default input input-bordered bg-base-200 text-base-content">
                    {user.email}
                  </div>
                </div>
              )}

              {user.phone && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="label">
                      <span className="label-text">Mobile Number</span>
                    </label>
                  </div>
                  <div className="w-full cursor-default input input-bordered bg-base-200 text-base-content">
                    {user.phone}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-base-200">
      <div className="max-w-2xl mx-auto shadow bg-base-100 rounded-xl">
        <div className="flex items-center justify-between p-6 border-b border-base-300">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button onClick={cancelEdit} className="btn btn-ghost btn-circle">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="object-cover w-24 h-24 border-4 rounded-full border-base-300"
                />
              ) : (
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/20">
                  <span className="text-2xl font-semibold text-primary">{newUserName.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <label
                htmlFor="imageUpload"
                className="absolute p-2 rounded-full cursor-pointer btn btn-primary btn-circle btn-sm -bottom-1 -right-1"
              >
                <Camera size={16} />
              </label>
              <input type="file" id="imageUpload" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Profile Photo</h3>
              <p className="text-sm text-base-content/60">Click the camera icon to upload a new photo</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">User Name</span>
                </label>
                <input
                  type="text"
                  name="newUserName"
                  value={newUserName.split(' ')[0] || ''}
                  onChange={e => {
                    const lastName = newUserName.split(' ').slice(1).join(' ');
                    setNewUserName(e.target.value + lastName);
                  }}
                  className="w-full input input-bordered"
                  placeholder="First Name"
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Login Method</span>
              </label>
              <div className="flex gap-4 mb-4">
                <label className="cursor-pointer label">
                  <input
                    type="radio"
                    name="contactType"
                    value="email"
                    checked={contactType === 'email'}
                    onChange={e => setContactType(e.target.value)}
                    className="radio radio-primary"
                  />
                  <span className="ml-2 label-text">Email</span>
                </label>
                <label className="cursor-pointer label">
                  <input
                    type="radio"
                    name="contactType"
                    value="phone"
                    checked={contactType === 'phone'}
                    onChange={e => setContactType(e.target.value)}
                    className="radio radio-primary"
                  />
                  <span className="ml-2 label-text">Phone</span>
                </label>
              </div>
            </div>

            {contactType === 'email' ? (
              <div>
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  name="newEmail"
                  value={newEmail}
                  onChange={handleChange}
                  className="w-full input input-bordered"
                  placeholder="Email Address"
                />
              </div>
            ) : (
              <div>
                <label className="label">
                  <span className="label-text">Mobile Number</span>
                </label>
                <input
                  type="tel"
                  name="newPhone"
                  value={newPhone}
                  onChange={handleChange}
                  className="w-full input input-bordered"
                  placeholder="Mobile Number"
                />
              </div>
            )}

            <div className="flex">
              <div className="p-2">
                <label className="label">
                  <span className="label-text">old password</span>
                </label>
                <input
                  type="search"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={handleChange}
                  className="w-full input input-bordered"
                  placeholder="Old password"
                />
              </div>

              <div className="p-4">
                <label className="label">
                  <span className="label-text">newPassword</span>
                </label>
                <input
                  type="email"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChange}
                  className="w-full input input-bordered"
                  placeholder="New Password"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-6 mt-8 border-t border-base-300">
            <button onClick={cancelEdit} className="flex-1 btn btn-outline">
              Cancel
            </button>
            <button onClick={saveChanges} disabled={isLoading} className="flex-1 btn btn-primary">
              <Save size={16} />
              Save Changes
            </button>

            {isOtpVerify && (
              <UpdateProfileOTP
                userId={user._id + ''}
                auth={isOtpVerify}
                closeOtp={() => setOtpVerify(null)}
                getUserProfile={getUserProfile}
                closeEdit={() => {
                  setIsEditMode(false);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
