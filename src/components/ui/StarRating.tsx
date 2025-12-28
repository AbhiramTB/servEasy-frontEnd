import React from 'react';

interface StarRatingCardProps {
  rating: number;
  comment: string;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
}

const StarRatingCard: React.FC<StarRatingCardProps> = ({ rating, comment, maxStars = 5, size = 'md' }) => {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];

  return (
    <div className="p-4 rounded-lg shadow bg-base-200">
      <div className="flex mb-2">
        {Array.from({ length: maxStars }, (_, i) => {
          const star = i + 1;
          return (
            <svg
              key={star}
              className={`${sizeClass} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        })}
      </div>

      <p className="text-sm text-gray-700">{comment}</p>
    </div>
  );
};

export default StarRatingCard;
