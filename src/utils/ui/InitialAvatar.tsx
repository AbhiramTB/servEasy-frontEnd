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
<<<<<<< HEAD
=======

>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
>>>>>>> 9a5a590b2c07a625cfd50f400a3c18919d5bad68
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
    return (
      <div className="avatar">
        <div className="rounded-full" style={{ width: size, height: size }}>
          <img src={imageSrc} alt={name} className="w-full h-full object-cover rounded-full" />
        </div>
      </div>
    );
  }
<<<<<<< HEAD

=======
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
>>>>>>> 9a5a590b2c07a625cfd50f400a3c18919d5bad68
  return (
    <div
      className={`flex items-center justify-center rounded-full font-semibold  ${bgColor} ${textColor}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
<<<<<<< HEAD
      {name.charAt(0).toUpperCase()}
=======
<<<<<<< HEAD
      {initial}
=======
      {name.charAt(0).toUpperCase() + name.slice(0, 1)}
>>>>>>> bba0d59efc976b14794191f4ec7012712d072dd6
>>>>>>> 9a5a590b2c07a625cfd50f400a3c18919d5bad68
    </div>
  );
};

export default InitialAvatar;
