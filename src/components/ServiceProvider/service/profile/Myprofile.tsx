import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState } from '../../../../redux/store';
import { IServiceProvider } from '../../../../utils/types/IServiceProvider';
import {putRequest } from '../../../../utils/makeRequestInstance';
import { apiEndPointServiceProvider } from '../../../../utils/constant';

const Myprofile = () => {
  const serviceProvider = useSelector((state: RootState) => state.serviceProvider) as IServiceProvider;
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceProviderName: '',
    serviceProviderEmail: '',
    serviceProviderPhone: '',
    socialMedia: '',
    bankDetails: {
      accountHolderName: '',
      accountNumber: '',
      ifscCode: ''
    }
  });

  useEffect(() => {
    if (serviceProvider) {
      setFormData({
        serviceProviderName: serviceProvider.serviceProviderName || '',
        serviceProviderEmail: serviceProvider.serviceProviderEmail || '',
        serviceProviderPhone: serviceProvider.serviceProviderPhone || '',
        socialMedia: serviceProvider.socialMedia || '',
        bankDetails: {
          accountHolderName: serviceProvider.bankDetails?.accountHolderName || '',
          accountNumber: serviceProvider.bankDetails?.accountNumber || '',
          ifscCode: serviceProvider.bankDetails?.ifscCode || ''
        }
      });
    }
  }, [serviceProvider]);

  const updateProfile = async (fData: any) => {
    try {
       const data={...fData,_id:serviceProvider._id}
      const response = await putRequest(apiEndPointServiceProvider.getServiceProvider,data);
   
        if(response.status==200){
          
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
          [bankField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
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
      setFormData({
        serviceProviderName: serviceProvider.serviceProviderName || '',
        serviceProviderEmail: serviceProvider.serviceProviderEmail || '',
        serviceProviderPhone: serviceProvider.serviceProviderPhone || '',
        socialMedia: serviceProvider.socialMedia || '',
        bankDetails: {
          accountHolderName: serviceProvider.bankDetails?.accountHolderName || '',
          accountNumber: serviceProvider.bankDetails?.accountNumber || '',
          ifscCode: serviceProvider.bankDetails?.ifscCode || ''
        }
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen py-8 bg-base-100">
      <div className="max-w-4xl px-6 mx-auto">
        <div className="p-6 mb-6 border shadow-sm bg-base-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Profile Management</h1>
              <p className="mt-1 text-base-content/70">Manage your personal and banking information</p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5
                        m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Personal Info */}
          <div className="p-6 border shadow-sm bg-base-100 rounded-xl">
            <h2 className="mb-4 text-lg font-semibold">Personal Information</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          <div className="p-6 border shadow-sm bg-base-100 rounded-xl">
            <h2 className="mb-4 text-lg font-semibold">Banking Information</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

          {/* Buttons */}
          {isEditing && (
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-outline"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
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
