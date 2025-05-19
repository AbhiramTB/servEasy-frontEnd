import React from "react";

interface InitialAvatarProps {
  name: string;
  size?: number; 
  bgColor?: string;
  textColor?: string;
}

const InitialAvatar: React.FC<InitialAvatarProps> = ({
  name,
  size = 40,
  bgColor = "bg-base-300",
  textColor = "bg-primary",
}) => {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className={`flex items-center   justify-center rounded-full ${bgColor} ${textColor}`}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      {initial}
    </div>
  );
};

export default InitialAvatar;
