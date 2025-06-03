import React from 'react';
import { Shield } from 'lucide-react';

const BlockedUserMessage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body text-center p-8">
            
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-error bg-opacity-20 flex items-center justify-center">
                <Shield className="w-10 h-10 text-error" />
              </div>
            </div>
            
            {/* Message */}
            <h1 className="text-2xl font-bold mb-4 text-error">
              Account Blocked
            </h1>
            
            <p className="text-base-content opacity-80 mb-6">
              Your account is currently blocked. Please contact admin for assistance.
            </p>
            
           
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedUserMessage;