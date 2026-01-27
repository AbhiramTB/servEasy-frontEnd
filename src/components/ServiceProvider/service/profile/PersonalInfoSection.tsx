import React from 'react';
import { IServiceProvider } from '../../../../utils/types/IServiceProvider';

interface PersonalInfoSectionProps {
  serviceProvider: IServiceProvider;
  isEditing: boolean;
  formData: {
    serviceProviderName: string;
    serviceProviderEmail: string;
    serviceProviderPhone: string;
    socialMedia: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  serviceProvider,
  isEditing,
  formData,
  onInputChange,
}) => {
  return (
    <div className="p-6 mb-6 border rounded-lg shadow-sm bg-base-100 text-primary">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 mr-4 overflow-hidden rounded-full bg-base-200">
          {serviceProvider?.profileImage ? (
            <img
              src={serviceProvider.profileImage}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-primary">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <p className="text-sm opacity-80">Basic details and contact information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Full Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              name="serviceProviderName"
              value={formData.serviceProviderName}
              onChange={onInputChange}
              className="w-full px-3 py-2 border rounded-md border-base-300 text-primary bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          ) : (
            <p className="px-3 py-2 rounded-md bg-base-200">
              {formData.serviceProviderName || serviceProvider?.serviceProviderName || 'Not provided'}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-medium">Email Address</label>
          {isEditing ? (
            <input
              type="email"
              name="serviceProviderEmail"
              value={formData.serviceProviderEmail}
              onChange={onInputChange}
              className="w-full px-3 py-2 border rounded-md border-base-300 text-primary bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          ) : (
            <p className="px-3 py-2 rounded-md bg-base-200">
              {formData.serviceProviderEmail || serviceProvider?.serviceProviderEmail || 'Not provided'}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 text-sm font-medium">Phone Number</label>
          {isEditing ? (
            <input
              type="tel"
              name="serviceProviderPhone"
              value={formData.serviceProviderPhone}
              onChange={onInputChange}
              className="w-full px-3 py-2 border rounded-md border-base-300 text-primary bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          ) : (
            <p className="px-3 py-2 rounded-md bg-base-200">
              {formData.serviceProviderPhone || serviceProvider?.serviceProviderPhone || 'Not provided'}
            </p>
          )}
        </div>

        {/* Social Media */}
        <div>
          <label className="block mb-2 text-sm font-medium">Social Media</label>
          {isEditing ? (
            <input
              type="text"
              name="socialMedia"
              value={formData.socialMedia}
              onChange={onInputChange}
              className="w-full px-3 py-2 border rounded-md border-base-300 text-primary bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Social media handle or URL"
            />
          ) : (
            <p className="px-3 py-2 rounded-md bg-base-200">
              {formData.socialMedia || serviceProvider?.socialMedia || 'Not provided'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
