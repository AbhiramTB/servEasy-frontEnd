import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState } from '../../../../redux/store';
import { IServiceProvider } from '../../../../utils/types/IServiceProvider';
import { putRequest } from '../../../../utils/makeRequestInstance';
import { apiEndPointServiceProvider } from '../../../../utils/constant';
import SubscriptionInfoServiceProvider from './SubscriptionInfoServiceProvider';
import { openModal } from '../../../../redux/slices/subscriptionSlice';
import { useDispatch } from 'react-redux';
import UpgradePlanButton from '../../../ui/UpgradePlanButton';
import { Crown, Edit, Save } from 'lucide-react';

const Myprofile = () => {
  const serviceProvider = useSelector((state: RootState) => state.serviceProvider) as IServiceProvider;
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState({
    serviceProviderName: '',
    serviceProviderEmail: '',
    serviceProviderPhone: '',
    socialMedia: '',
    bankDetails: {
      accountHolderName: '',
      accountNumber: '',
      ifscCode: '',
    },
  });
  const [formData, setFormData] = useState({
    serviceProviderName: '',
    serviceProviderEmail: '',
    serviceProviderPhone: '',
    socialMedia: '',
    bankDetails: {
      accountHolderName: '',
      accountNumber: '',
      ifscCode: '',
    },
  });
  useEffect(() => {
    if (serviceProvider) {
      const initialData = {
        serviceProviderName: serviceProvider.serviceProviderName || '',
        serviceProviderEmail: serviceProvider.serviceProviderEmail || '',
        serviceProviderPhone: serviceProvider.serviceProviderPhone || '',
        socialMedia: serviceProvider.socialMedia || '',
        bankDetails: {
          accountHolderName: serviceProvider.bankDetails?.accountHolderName || '',
          accountNumber: serviceProvider.bankDetails?.accountNumber || '',
          ifscCode: serviceProvider.bankDetails?.ifscCode || '',
        },
      };
      setOriginalData(initialData);
      setFormData(initialData);
    }
  }, [serviceProvider]);

  useEffect(() => {
    const hasDataChanged = JSON.stringify(formData) !== JSON.stringify(originalData);
    setHasChanges(hasDataChanged);
  }, [formData, originalData]);

  const updateProfile = async (fData: any) => {
    try {
      const data = { ...fData, _id: serviceProvider._id };
      const response = await putRequest(apiEndPointServiceProvider.getServiceProvider, data);

      if (response.status == 200) {
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('bank.')) {
      const bankField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [bankField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (serviceProvider) {
      const resetData = {
        serviceProviderName: serviceProvider.serviceProviderName || '',
        serviceProviderEmail: serviceProvider.serviceProviderEmail || '',
        serviceProviderPhone: serviceProvider.serviceProviderPhone || '',
        socialMedia: serviceProvider.socialMedia || '',
        bankDetails: {
          accountHolderName: serviceProvider.bankDetails?.accountHolderName || '',
          accountNumber: serviceProvider.bankDetails?.accountNumber || '',
          ifscCode: serviceProvider.bankDetails?.ifscCode || '',
        },
      };
      setFormData(resetData);
      setOriginalData(resetData);
    }
    setIsEditing(false);
    setHasChanges(false);
  };

  return (
    <div className="min-h-screen py-4 sm:py-8 bg-base-100">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="p-4 mb-6 border shadow-sm sm:p-6 bg-base-200 rounded-xl">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="avatar">
                <div className="w-16 rounded-full sm:w-24 ring-primary ring-offset-base-100 ring-1 ring-offset-1">
                  {serviceProvider.isProServiceProvider && (
                    <Crown className="absolute p-1 text-yellow-400 rounded-full ring-2 ring-yellow-400 ring-offset-2 end-0 bg-base-100"></Crown>
                  )}
                  <img src={serviceProvider.profileImage} alt="Profile" />
                </div>
              </div>
              <div>
                <div className="opacity-70 ">
                  <UpgradePlanButton />
                </div>

                <h1 className="text-xl font-bold sm:text-2xl">Profile Management</h1>
                <p className="mt-1 text-sm text-base-content/70 sm:text-base">
                  Manage your personal and banking information
                </p>
              </div>
            </div>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="w-full btn btn-primary sm:w-auto">
                <Edit className="w-4 h-4 mr-1" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Personal Info */}
          <div className="p-4 border shadow-sm sm:p-6 bg-base-100 rounded-xl">
            <h2 className="mb-4 text-lg font-semibold">Personal Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="serviceProviderName"
                disabled={!isEditing}
                placeholder="Full Name"
                className="w-full input input-bordered"
                value={formData.serviceProviderName}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="serviceProviderEmail"
                disabled
                placeholder="Email"
                className="w-full input input-bordered"
                value={formData.serviceProviderEmail}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="serviceProviderPhone"
                disabled={!isEditing}
                placeholder="Phone"
                className="w-full input input-bordered"
                value={formData.serviceProviderPhone}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="socialMedia"
                disabled={!isEditing}
                placeholder="Social Media (optional)"
                className="w-full input input-bordered"
                value={formData.socialMedia}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Bank Info */}
          <div className="p-4 border shadow-sm sm:p-6 bg-base-100 rounded-xl">
            <h2 className="mb-4 text-lg font-semibold">Banking Information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <input
                type="text"
                name="bank.accountHolderName"
                disabled={!isEditing}
                placeholder="Account Holder Name"
                className="w-full input input-bordered"
                value={formData.bankDetails.accountHolderName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="bank.accountNumber"
                disabled={!isEditing}
                placeholder="Account Number"
                className="w-full input input-bordered"
                value={formData.bankDetails.accountNumber}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="bank.ifscCode"
                disabled={!isEditing}
                placeholder="IFSC Code"
                className="w-full input input-bordered"
                value={formData.bankDetails.ifscCode}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Subscription Info */}
          <div className="p-4 border shadow-sm sm:p-6 bg-base-100 rounded-xl">
            <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center">
              <h2 className="mb-2 text-lg font-semibold sm:mb-0">Subscription Information</h2>
              <UpgradePlanButton />
            </div>

            {serviceProvider?.subscriptions?.length ? (
              <SubscriptionInfoServiceProvider subscriptions={serviceProvider.subscriptions} />
            ) : (
              <></>
            )}
          </div>

          {/* Action Buttons */}
          {isEditing && hasChanges && (
            <div className="flex flex-col gap-3 mt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full btn btn-outline sm:w-auto"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full btn btn-primary sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-1" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
