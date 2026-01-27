import React from 'react';
import { Clock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';



const PendingVerificationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body text-center p-8 md:p-12">
            
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-warning bg-opacity-20 flex items-center justify-center">
                <Clock className="w-12 h-12 text-warning" />
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-base-content">
              Registration Under Review
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-xl md:text-2xl font-semibold mb-8 text-base-content opacity-80">
              Your Service Provider Request is Pending
            </h2>
            
            {/* Description */}
            <div className="space-y-6 mb-8">
              <p className="text-lg text-base-content opacity-70">
                Thank you for submitting your service provider registration request. 
                Our admin team is currently reviewing your application.
              </p>
              
              <div className="alert alert-info">
                <Mail className="w-5 h-5" />
                <span>
                  You'll get updates on your registered email or check back after some time
                </span>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="bg-base-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-lg mb-3">What happens next?</h3>
              <div className="text-left space-y-2 text-sm opacity-80">
                <p>• Our team will review your submitted documents</p>
                <p>• You'll receive an email notification once reviewed</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Link to={"/"}>
           
              <button className="btn btn-primary btn-lg">
                Back to Dashboard
              </button>
           </Link>
             
            </div>
            
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default PendingVerificationPage;