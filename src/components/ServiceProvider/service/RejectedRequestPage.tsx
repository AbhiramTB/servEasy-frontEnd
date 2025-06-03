import React from 'react';
import { XCircle, Mail, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RejectedRequestInfo {
  // No props needed since we're using generic messaging
}

const RejectedRequestPage: React.FC<RejectedRequestInfo> = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body text-center p-8 md:p-12">
            
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-error bg-opacity-20 flex items-center justify-center">
                <XCircle className="w-12 h-12 text-error" />
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-base-content">
              Request Rejected
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-xl md:text-2xl font-semibold mb-8 text-base-content opacity-80">
              Your Service Provider Registration was not approved
            </h2>
            
            {/* Description */}
            <div className="space-y-6 mb-8">
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
            <div className="bg-base-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-lg mb-3">What you can do next:</h3>
              <div className="text-left space-y-2 text-sm opacity-80">
                <p>• Check your email (including spam folder) for rejection details</p>
                <p>• Review the requirements and address any issues mentioned</p>
                <p>• Contact our support team if you need clarification</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Link to={"/"}>
           
              <button className="btn btn-primary btn-lg">
                Back to Dashboard
              </button>
           </Link>
             
            </div>
            
          </div>
        </div>
        
        {/* Footer Message */}
        <div className="text-center mt-6 opacity-60">
          <p className="text-sm">
            Need help understanding the rejection? Contact our support team at serveasy@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default RejectedRequestPage;