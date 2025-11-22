import React from 'react';

interface InitialAvatarProps {
  name: string;
  imageSrc?: string;
  size?: number;

  bgColor?: string;
  textColor?: string;
}

const InitialAvatar: React.FC<InitialAvatarProps> = ({
  name,
  size = 40,
  imageSrc,
  bgColor = 'bg-base-300',
  textColor = 'text-primary',
}) => {
  if (imageSrc) {
    return <img alt={name} src={imageSrc} />;
  }
  return (
    <div
      className={`flex items-center   justify-center rounded-full ${bgColor} ${textColor}`}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      {name.charAt(0).toUpperCase() + name.slice(0, 1)}
    </div>
  );
};

export default InitialAvatar;
