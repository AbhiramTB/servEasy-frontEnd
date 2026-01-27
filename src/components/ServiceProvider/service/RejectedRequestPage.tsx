import React from 'react';
import { XCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RejectedRequestInfo {
  // No props needed since we're using generic messaging
}

const RejectedRequestPage: React.FC<RejectedRequestInfo> = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-base-200">
      <div className="w-full max-w-2xl">
        <div className="shadow-2xl card bg-base-100">
          <div className="p-8 text-center card-body md:p-12">
            
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-error bg-opacity-20">
                <XCircle className="w-12 h-12 text-error" />
              </div>
            </div>
            
            {/* Title */}
            <h1 className="mb-6 text-3xl font-bold md:text-4xl text-base-content">
              Request Rejected
            </h1>
            
            {/* Subtitle */}
            <h2 className="mb-8 text-xl font-semibold md:text-2xl text-base-content opacity-80">
              Your Service Provider Registration was not approved
            </h2>
            
            {/* Description */}
            <div className="mb-8 space-y-6">
              <p className="text-lg text-base-content opacity-70">
                Unfortunately, your service provider registration request has been rejected. 
                Please check your email for detailed information about the reason.
              </p>
              
              <div className="alert alert-error">
                <Mail className="w-5 h-5" />
                <span>
                  The reason for rejection has been sent to your registered email
                </span>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="p-6 mb-8 rounded-lg bg-base-200">
              <h3 className="mb-3 text-lg font-semibold">What you can do next:</h3>
              <div className="space-y-2 text-sm text-left opacity-80">
                <p>• Check your email (including spam folder) for rejection details</p>
                <p>• Review the requirements and address any issues mentioned</p>
                <p>• Contact our support team if you need clarification</p>
              </div>
            </div>
            
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
           <Link to={"/"}>
           
              <button className="btn btn-primary btn-lg">
                Back to Dashboard
              </button>
           </Link>
             
            </div>
            
          </div>
        </div>
        
        {/* Footer Message */}
        <div className="mt-6 text-center opacity-60">
          <p className="text-sm">
            Need help understanding the rejection? Contact our support team at serveasy@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default RejectedRequestPage;