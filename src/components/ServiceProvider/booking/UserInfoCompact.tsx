// components/common/UserInfoCompact.tsx

import React from 'react';
import InitialAvatar from '../../../utils/ui/InitialAvatar';

interface UserInfoCompactProps {
  profileImage: string;
  userName: string;
  email: string;
  phone: string;
}

const UserInfoCompact: React.FC<UserInfoCompactProps> = ({ profileImage, userName, email, phone }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="mr-3 avatar">
        <div className="w-10 h-10 rounded-full">
          <InitialAvatar name={userName} imageSrc={profileImage} />
        </div>
      </div>
      <div>
        <div className="font-medium">{userName}</div>
        <div className="text-xs opacity-75">
          <span className="mr-2">
            {email} {phone}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCompact;
