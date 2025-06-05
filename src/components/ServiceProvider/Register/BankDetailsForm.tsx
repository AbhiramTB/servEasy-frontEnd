import React from "react";
import { BankDetails } from "../../../utils/types/IServiceProvider";



interface BankDetailsFormProps {
  setBankDetails: React.Dispatch<React.SetStateAction<BankDetails>>;
  bankDetails: BankDetails;
}

const isDev = process.env.NODE_ENV === "development";

const BankDetailsForm: React.FC<BankDetailsFormProps> = ({
  setBankDetails,
  bankDetails,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 space-y-6 shadow-md rounded-xl">
      <div className="form-control">
        <label className="label">
          <span className="font-semibold label-text text-primary">
            Account Holder Name
          </span>
        </label>
        {isDev && (
          <small className="mb-1 text-xs text-gray-400">
            Test Account Holder Name: Razorpay Test
          </small>
        )}
        <input
          type="text"
          name="accountHolderName"
          className="input input-bordered bg-base-200"
          value={bankDetails.accountHolderName}
          onChange={handleChange}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="font-semibold label-text text-primary">
            Account Number
          </span>
        </label>
        {isDev && (
          <small className="mb-1 text-xs text-gray-400">
            Test Account Number: 1121431121541121
          </small>
        )}
        <input
          type="text"
          name="accountNumber"
          className="input input-bordered bg-base-200"
          value={bankDetails.accountNumber}
          onChange={handleChange}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="font-semibold label-text text-primary">
            IFSC Code
          </span>
        </label>
        {isDev && (
          <small className="mb-1 text-xs text-gray-400">
            Test IFSC Code: HDFC0001233
          </small>
        )}
        <input
          type="text"
          name="ifscCode"
          className="input input-bordered bg-base-200"
          value={bankDetails.ifscCode}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default BankDetailsForm;
