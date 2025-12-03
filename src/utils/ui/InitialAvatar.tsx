<<<<<<< HEAD
import React from "react";

interface InitialAvatarProps {
  name: string;
  size?: number; 
=======
import React from 'react';

interface InitialAvatarProps {
  name: string;
  imageSrc?: string;
  size?: number;

>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
  bgColor?: string;
  textColor?: string;
}

const InitialAvatar: React.FC<InitialAvatarProps> = ({
  name,
  size = 40,
<<<<<<< HEAD
  bgColor = "bg-base-300",
  textColor = "bg-primary",
}) => {
  const initial = name.charAt(0).toUpperCase();

=======
  imageSrc,
  bgColor = 'bg-base-300',
  textColor = 'text-primary',
}) => {
  if (imageSrc) {
    return <img alt={name} src={imageSrc} />;
  }
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
  return (
    <div
      className={`flex items-center   justify-center rounded-full ${bgColor} ${textColor}`}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
<<<<<<< HEAD
      {initial}
=======
      {name.charAt(0).toUpperCase() + name.slice(0, 1)}
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
    </div>
  );
};

export default InitialAvatar;
