import React from 'react';

interface UserProfileProps {
  user: {
    _id: string;
    userName: string;
    email: string;
    phone: string;
    password: string;
    isVerified: boolean;
    isBlocked?: boolean;
    profileImage?: string;
  };
  onClose: () => void;
}

const UserProfileView: React.FC<UserProfileProps> = ({ user, onClose }) => {
  // Get user initials for avatar fallback
  const userInitials = user.userName.substring(0, 2).toUpperCase();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">User Profile</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Profile content */}
        <div className="p-6">
          {/* Profile header with image/avatar */}
          <div className="flex flex-col items-center mb-6">
            {user.profileImage ? (
              <img 
                src={user.profileImage} 
                alt={user.userName}
                className="h-24 w-24 rounded-full object-cover border-2 border-blue-500"
              />
            ) : (
              <div className="h-24 w-24 rounded-full flex items-center justify-center bg-blue-600 text-white text-2xl font-bold">
                {userInitials}
              </div>
            )}
            
            <h3 className="mt-4 text-xl font-bold text-white">{user.userName}</h3>
            
            <div className="mt-2 flex space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isVerified ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                {user.isVerified ? 'Verified' : 'Unverified'}
              </span>
              
              {user.isBlocked !== undefined && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isBlocked ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
                  {user.isBlocked ? 'Blocked' : 'Active'}
                </span>
              )}
            </div>
          </div>
          
          {/* User details */}
          <div className="space-y-4">
            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Account Information</h4>
              
              <div className="space-y-3">
                {/* ID */}
                <div className="flex">
                  <span className="text-gray-400 w-24 flex-shrink-0">User ID:</span>
                  <span className="text-gray-200 text-sm font-mono">{user._id}</span>
                </div>
                
                {/* Email */}
                <div className="flex">
                  <span className="text-gray-400 w-24 flex-shrink-0">Email:</span>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-200">{user.email}</span>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex">
                  <span className="text-gray-400 w-24 flex-shrink-0">Phone:</span>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-200">{user.phone}</span>
                  </div>
                </div>
                
                {/* Password (masked) */}
                <div className="flex">
                  <span className="text-gray-400 w-24 flex-shrink-0">Password:</span>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-gray-200">••••••••</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex border-t border-gray-700">
          <button
            className="flex-1 py-4 text-gray-300 hover:bg-gray-700 transition-colors duration-200 ease-in-out"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className={`flex-1 py-4 transition-colors duration-200 ease-in-out ${user.isBlocked ? 'text-green-400 hover:bg-green-900/20' : 'text-red-400 hover:bg-red-900/20'}`}
          >
            {user.isBlocked ? 'Unblock User' : 'Block User'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;