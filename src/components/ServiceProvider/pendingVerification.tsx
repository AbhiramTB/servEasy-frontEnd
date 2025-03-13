import React from 'react';
import { HiOutlineClock, HiOutlineExclamationCircle, HiOutlineMail } from 'react-icons/hi';
interface serviceProviderInfo{
    email:string
}
const PendingVerificationCard:React.FC<serviceProviderInfo> = ({email}) => {
  return (
    <div className="card w-full max-w-md bg-base-300 shadow-xl mx-auto">
      <div className="card-body">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center">
            <HiOutlineClock className="w-8 h-8 text-warning" />
          </div>
        </div>
        
        <h2 className="card-title text-center justify-center text-xl font-bold">
          Your Service Provider Registration Request is Pending
        </h2>
        
        <div className="py-4 text-center">
          <p className="mb-4">Your request is currently under review by admin.</p>
          
          <div className="flex items-center justify-center text-sm bg-info bg-opacity-10 text-info p-3 rounded-lg mb-3">
            <HiOutlineMail className="mr-2 flex-shrink-0" />
            <span>You'll get the updates {email}</span>
          </div>
          
          <div className="flex items-center justify-center text-sm text-base-content/70 mt-2">
            <HiOutlineExclamationCircle className="mr-2" />
            <span>Verification usually takes 24-48 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingVerificationCard;