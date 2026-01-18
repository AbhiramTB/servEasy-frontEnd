import React from 'react';
import { IServiceProvider, BankDetails } from '../../../../utils/types/IServiceProvider';

interface BankInfoSectionProps {
  serviceProvider: IServiceProvider;
  isEditing: boolean;
  formData: {
    bankDetails: BankDetails;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BankInfoSection: React.FC<BankInfoSectionProps> = ({ serviceProvider, isEditing, formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center w-12 h-12 mr-4 shadow bg-accent/20 rounded-xl">
          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-base-content">Banking Information</h2>
          <p className="text-base-content/70">Payment and account details for transactions</p>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Account Holder Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-base-content">
            Account Holder Name<span className="ml-1 text-error">*</span>
          </label>
          {isEditing ? (
            <input
              type="text"
              name="bank.accountHolderName"
              value={formData.bankDetails.accountHolderName}
              onChange={onInputChange}
              placeholder="Enter full name as per bank records"
              className="w-full input input-bordered"
            />
          ) : (
            <div className="input bg-base-200 text-base-content min-h-[48px] flex items-center">
              {formData.bankDetails.accountHolderName || serviceProvider?.bankDetails?.accountHolderName || (
                <span className="italic text-base-content/50">Not provided</span>
              )}
            </div>
          )}
        </div>

        {/* Account Number */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-base-content">
            Account Number<span className="ml-1 text-error">*</span>
          </label>
          {isEditing ? (
            <input
              type="text"
              name="bank.accountNumber"
              value={formData.bankDetails.accountNumber}
              onChange={onInputChange}
              placeholder="Enter account number"
              className="w-full font-mono tracking-wider input input-bordered"
            />
          ) : (
            <div className="input bg-base-200 text-base-content min-h-[48px] flex items-center font-mono tracking-wider">
              {formData.bankDetails.accountNumber || serviceProvider?.bankDetails?.accountNumber || (
                <span className="font-sans italic text-base-content/50">Not provided</span>
              )}
            </div>
          )}
        </div>

        {/* IFSC Code */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-base-content">
            IFSC Code<span className="ml-1 text-error">*</span>
          </label>
          {isEditing ? (
            <input
              type="text"
              name="bank.ifscCode"
              value={formData.bankDetails.ifscCode}
              onChange={onInputChange}
              placeholder="Enter IFSC code"
              className="w-full font-mono tracking-wider uppercase input input-bordered"
              style={{ textTransform: 'uppercase' }}
              maxLength={11}
            />
          ) : (
            <div className="input bg-base-200 text-base-content min-h-[48px] flex items-center font-mono tracking-wider uppercase">
              {formData.bankDetails.ifscCode || serviceProvider?.bankDetails?.ifscCode || (
                <span className="font-sans italic normal-case text-base-content/50">Not provided</span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="alert bg-warning/10 text-warning-content border-warning/20">
        <svg className="w-5 h-5 stroke-current shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.168 18.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <div>
          <h4 className="font-medium">Security Notice</h4>
          <span className="text-sm">
            Your banking information is encrypted and secure. This data is used only for payment processing and will
            never be shared with third parties.
          </span>
        </div>
      </div>
    </div>
  );
};

export default BankInfoSection;
