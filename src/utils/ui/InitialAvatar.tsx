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
    return (
      <div className="avatar">
        <div className="rounded-full" style={{ width: size, height: size }}>
          <img src={imageSrc} alt={name} className="w-full h-full object-cover rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full font-semibold  ${bgColor} ${textColor}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

export default InitialAvatar;
